import fs from 'node:fs'
import path from 'node:path'
import { z } from 'zod/v4'
import { buildTool, type ToolDef } from '../../Tool.js'
import { getCwd } from '../../utils/cwd.js'
import { lazySchema } from '../../utils/lazySchema.js'
import {
  brainDir,
  getVaultPath,
  mergeBrain,
  parseFrontmatter,
  projectNotePath,
  sessionFilePath,
  slugify,
  toStr,
  updateSection,
  wrap,
} from './memUtils.js'

function isEnabled(): boolean {
  return getVaultPath() !== null
}

const outputSchema = lazySchema(() => z.object({ result: z.string() }))

// ─── log_session ────────────────────────────────────────────────────────────

const logSessionInputSchema = lazySchema(() =>
  z.strictObject({
    title: z.string().describe('Short title for this work block (e.g. "Add auth middleware")'),
    summary: z.string().describe('2-3 sentence description of what was done'),
    items: z
      .array(z.object({ item: z.string(), detail: z.string() }))
      .optional()
      .describe('Key files/things changed → what was done (shown as a table)'),
    discoveries: z.array(z.string()).optional().describe('Key insights discovered'),
    warnings: z.array(z.string()).optional().describe('Gotchas or non-obvious constraints'),
    tips: z.array(z.string()).optional().describe('Best practices or recommended approaches'),
    next_session: z.string().optional().describe('What to pick up next time'),
    diagram: z.string().optional().describe('Mermaid diagram body (no fences)'),
  }),
)
type LogSessionInputSchema = ReturnType<typeof logSessionInputSchema>

export const LogSessionTool = buildTool({
  name: 'log_session',
  searchHint: 'log a work session to the Obsidian vault project memory',
  maxResultSizeChars: 2000,
  async description() {
    return 'Log the current work session to the project memory vault. Call this at the end of a session or when /save is run.'
  },
  async prompt() {
    return 'Use log_session to record what was done, key changes, discoveries, and what to pick up next time. Always call this when the user runs /save.'
  },
  get inputSchema(): LogSessionInputSchema { return logSessionInputSchema() },
  get outputSchema() { return outputSchema() },
  userFacingName() { return 'log_session' },
  isEnabled,
  isReadOnly() { return false },
  isConcurrencySafe() { return false },
  renderToolUseMessage() { return null },
  async checkPermissions(input) { return { behavior: 'allow', updatedInput: input } },
  async call({ title, summary, items, discoveries, warnings, tips, next_session, diagram }) {
    const vault = getVaultPath()
    if (!vault) return { data: { result: 'No Obsidian vault configured. Set obsidianVault in settings.' } }
    const cwd = getCwd()

    try {
      const sf = sessionFilePath(vault, cwd)
      const project = path.basename(cwd)
      const today = new Date().toISOString().slice(0, 10)
      const now = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

      const lines: string[] = []
      lines.push(`## ${now} — ${title}`, '', summary, '')

      if (items?.length) {
        lines.push('| File / Thing | What |', '|:-------------|:-----|')
        for (const it of items) lines.push(`| \`${String(it?.item || '').trim()}\` | ${String(it?.detail || '').trim()} |`)
        lines.push('')
      }

      if (diagram) { lines.push('```mermaid', diagram.trim(), '```', '') }

      if (discoveries) for (const d of discoveries.map(toStr)) { lines.push('> [!info]'); for (const dl of wrap(d, 100)) lines.push(`> ${dl}`); lines.push('') }
      if (warnings) for (const w of warnings.map(toStr)) { lines.push('> [!warning]'); for (const wl of wrap(w, 100)) lines.push(`> ${wl}`); lines.push('') }
      if (tips) for (const t of tips.map(toStr)) { lines.push('> [!tip]'); for (const tl of wrap(t, 100)) lines.push(`> ${tl}`); lines.push('') }
      if (next_session) { lines.push(`**Next session:** ${next_session}`, '') }

      const block = lines.join('\n')

      if (!fs.existsSync(sf)) {
        fs.mkdirSync(path.dirname(sf), { recursive: true })
        fs.writeFileSync(sf, `---\ntags: [${project}, session, ${today}]\n---\n# ${project} — ${today}\n\n${block}`)
      } else {
        fs.writeFileSync(sf, fs.readFileSync(sf, 'utf8').trimEnd() + '\n\n' + block)
      }

      const readme = projectNotePath(vault, cwd)
      if (fs.existsSync(readme)) {
        let text = fs.readFileSync(readme, 'utf8')
        const link = `[[sessions/${today}]]`
        if (!text.includes(link)) {
          const entry = `- ${link} — ${title}\n`
          text = text.includes('## Sessions')
            ? text.replace('## Sessions\n', `## Sessions\n\n${entry}`).replace(/\n{3,}/g, '\n\n')
            : text.trimEnd() + `\n\n## Sessions\n\n${entry}`
          fs.writeFileSync(readme, text)
        }
      }

      return { data: { result: `Session logged → ${path.relative(vault, sf)}` } }
    } catch (e) {
      return { data: { result: `Error logging session: ${e instanceof Error ? e.message : String(e)}` } }
    }
  },
  mapToolResultToToolResultBlockParam({ result }, toolUseID) {
    return { tool_use_id: toolUseID, type: 'tool_result', content: result }
  },
} satisfies ToolDef<LogSessionInputSchema, { result: string }>)

// ─── save_knowledge ──────────────────────────────────────────────────────────

const saveKnowledgeInputSchema = lazySchema(() =>
  z.strictObject({
    topic: z.string().describe('Brain note topic (e.g. "patterns", "architecture", "files")'),
    summary: z.string().describe('1-2 sentence overview of this note'),
    sections: z
      .array(z.object({ heading: z.string(), content: z.string() }))
      .optional()
      .describe('Major topic sections'),
    items: z
      .array(z.object({ item: z.string(), detail: z.string() }))
      .optional()
      .describe('Key/value pairs shown as a table (file maps, command lists, etc.)'),
    discoveries: z.array(z.string()).optional().describe('Key insights → blue callouts'),
    warnings: z.array(z.string()).optional().describe('Gotchas → orange callouts'),
    tips: z.array(z.string()).optional().describe('Best practices → cyan callouts'),
    questions: z.array(z.string()).optional().describe('Open unknowns → yellow callouts'),
    tasks: z.array(z.string()).optional().describe('Things to investigate → task list'),
    diagram: z.string().optional().describe('Mermaid diagram body (no fences)'),
    patterns: z
      .array(z.object({ name: z.string(), language: z.string(), code: z.string() }))
      .optional()
      .describe('Code examples with labels'),
  }),
)
type SaveKnowledgeInputSchema = ReturnType<typeof saveKnowledgeInputSchema>

export const SaveKnowledgeTool = buildTool({
  name: 'save_knowledge',
  searchHint: 'save or update a project brain note in Obsidian',
  maxResultSizeChars: 2000,
  async description() {
    return 'Save or update a brain note for the current project. Merges new info with existing note. Call after /twinit scan or when discovering important patterns, architecture, or file maps.'
  },
  async prompt() {
    return 'Use save_knowledge to persist project knowledge (patterns, architecture, files, commands, rules, design). Merges with existing notes — safe to call repeatedly.'
  },
  get inputSchema(): SaveKnowledgeInputSchema { return saveKnowledgeInputSchema() },
  get outputSchema() { return outputSchema() },
  userFacingName() { return 'save_knowledge' },
  isEnabled,
  isReadOnly() { return false },
  isConcurrencySafe() { return false },
  renderToolUseMessage() { return null },
  async checkPermissions(input) { return { behavior: 'allow', updatedInput: input } },
  async call({ topic, summary, sections, items, discoveries, warnings, tips, questions, tasks, diagram, patterns }) {
    const vault = getVaultPath()
    if (!vault) return { data: { result: 'No Obsidian vault configured.' } }
    const cwd = getCwd()

    try {
      const project = path.basename(cwd)
      const slug = slugify(topic)
      const lines: string[] = []

      lines.push(`# ${project} — ${topic}`, '', summary, '')

      if (sections) for (const s of sections) {
        const h = String(s?.heading || '').trim()
        const c = String(s?.content || '').trim()
        if (h) lines.push(`## ${h}`, '')
        if (c) lines.push(c, '')
      }

      if (items?.length) {
        lines.push('| Item | Detail |', '|:-----|:-------|')
        for (const it of items) lines.push(`| \`${String(it?.item || '').trim()}\` | ${String(it?.detail || '').trim()} |`)
        lines.push('')
      }

      if (diagram) { lines.push('```mermaid', diagram.trim(), '```', '') }

      if (patterns) for (const p of patterns) {
        const n = String(p?.name || '').trim()
        const l = String(p?.language || 'typescript').trim()
        const c = String(p?.code || '').trim()
        if (n) lines.push(`### ${n}`, '')
        lines.push(`\`\`\`${l}`, c, '```', '')
      }

      if (discoveries) for (const d of discoveries.map(toStr)) { lines.push('> [!info]'); for (const dl of wrap(d, 100)) lines.push(`> ${dl}`); lines.push('') }
      if (tips) for (const t of tips.map(toStr)) { lines.push('> [!tip]'); for (const tl of wrap(t, 100)) lines.push(`> ${tl}`); lines.push('') }
      if (warnings) for (const w of warnings.map(toStr)) { lines.push('> [!warning]'); for (const wl of wrap(w, 100)) lines.push(`> ${wl}`); lines.push('') }
      if (questions) for (const q of questions.map(toStr)) { lines.push('> [!question]'); for (const ql of wrap(q, 100)) lines.push(`> ${ql}`); lines.push('') }

      if (tasks?.length) {
        lines.push('## To Do', '')
        for (const t of tasks) lines.push(`- [ ] ${t}`)
        lines.push('')
      }

      const brain = brainDir(vault, cwd)
      fs.mkdirSync(brain, { recursive: true })
      const p = path.join(brain, `${slug}.md`)

      if (fs.existsSync(p)) {
        const existing = fs.readFileSync(p, 'utf8')
        const merged = mergeBrain(existing, lines)
        fs.writeFileSync(p, `---\ntags: [${project}, brain, ${slug}]\n---\n${merged}`)
        return { data: { result: `Brain merged → ${path.relative(vault, p)}` } }
      }

      fs.writeFileSync(p, `---\ntags: [${project}, brain, ${slug}]\n---\n${lines.join('\n')}`)
      return { data: { result: `Brain created → ${path.relative(vault, p)}` } }
    } catch (e) {
      return { data: { result: `Error saving knowledge: ${e instanceof Error ? e.message : String(e)}` } }
    }
  },
  mapToolResultToToolResultBlockParam({ result }, toolUseID) {
    return { tool_use_id: toolUseID, type: 'tool_result', content: result }
  },
} satisfies ToolDef<SaveKnowledgeInputSchema, { result: string }>)

// ─── get_knowledge ───────────────────────────────────────────────────────────

const getKnowledgeInputSchema = lazySchema(() =>
  z.strictObject({
    topic: z.string().describe('Topic slug to retrieve (e.g. "patterns", "architecture"). Leave empty to list all.'),
  }),
)
type GetKnowledgeInputSchema = ReturnType<typeof getKnowledgeInputSchema>

export const GetKnowledgeTool = buildTool({
  name: 'get_knowledge',
  searchHint: 'read a project brain note from Obsidian',
  maxResultSizeChars: 50_000,
  async description() {
    return 'Read a brain note by topic for the current project. Pass an empty string to list all topics.'
  },
  async prompt() {
    return 'Use get_knowledge to read persisted project knowledge. Brain notes are auto-injected at startup but may be truncated — use this tool to read the full note.'
  },
  get inputSchema(): GetKnowledgeInputSchema { return getKnowledgeInputSchema() },
  get outputSchema() { return outputSchema() },
  userFacingName() { return 'get_knowledge' },
  isEnabled,
  isReadOnly() { return true },
  isConcurrencySafe() { return true },
  renderToolUseMessage() { return null },
  async checkPermissions(input) { return { behavior: 'allow', updatedInput: input } },
  async call({ topic }) {
    const vault = getVaultPath()
    if (!vault) return { data: { result: 'No Obsidian vault configured.' } }
    const cwd = getCwd()

    try {
      if (!topic) return { data: { result: listKnowledgeStr(vault, cwd) } }
      const slug = slugify(topic)
      const p = path.join(brainDir(vault, cwd), `${slug}.md`)
      if (!fs.existsSync(p)) return { data: { result: `No brain note for '${topic}' (looked in ${path.relative(vault, p)})` } }
      return { data: { result: fs.readFileSync(p, 'utf8') } }
    } catch (e) {
      return { data: { result: `Error reading knowledge: ${e instanceof Error ? e.message : String(e)}` } }
    }
  },
  mapToolResultToToolResultBlockParam({ result }, toolUseID) {
    return { tool_use_id: toolUseID, type: 'tool_result', content: result }
  },
} satisfies ToolDef<GetKnowledgeInputSchema, { result: string }>)

// ─── list_knowledge ──────────────────────────────────────────────────────────

const listKnowledgeInputSchema = lazySchema(() => z.strictObject({}))
type ListKnowledgeInputSchema = ReturnType<typeof listKnowledgeInputSchema>

export const ListKnowledgeTool = buildTool({
  name: 'list_knowledge',
  searchHint: 'list all brain notes for the current project',
  maxResultSizeChars: 10_000,
  async description() {
    return 'List all brain notes for the current project with their descriptions.'
  },
  async prompt() {
    return 'Use list_knowledge to see what knowledge has been saved for this project.'
  },
  get inputSchema(): ListKnowledgeInputSchema { return listKnowledgeInputSchema() },
  get outputSchema() { return outputSchema() },
  userFacingName() { return 'list_knowledge' },
  isEnabled,
  isReadOnly() { return true },
  isConcurrencySafe() { return true },
  renderToolUseMessage() { return null },
  async checkPermissions(input) { return { behavior: 'allow', updatedInput: input } },
  async call(_input) {
    const vault = getVaultPath()
    if (!vault) return { data: { result: 'No Obsidian vault configured.' } }
    try {
      return { data: { result: listKnowledgeStr(vault, getCwd()) } }
    } catch (e) {
      return { data: { result: `Error listing knowledge: ${e instanceof Error ? e.message : String(e)}` } }
    }
  },
  mapToolResultToToolResultBlockParam({ result }, toolUseID) {
    return { tool_use_id: toolUseID, type: 'tool_result', content: result }
  },
} satisfies ToolDef<ListKnowledgeInputSchema, { result: string }>)

function listKnowledgeStr(vault: string, cwd: string): string {
  const brain = brainDir(vault, cwd)
  const rel = path.relative(vault, brain)
  if (!fs.existsSync(brain)) return `No brain notes yet (looked in ${rel})`
  const files = fs.readdirSync(brain).filter(f => f.endsWith('.md')).sort()
  if (!files.length) return `No brain notes yet (looked in ${rel})`
  const rows: string[] = []
  for (const f of files) {
    const topic = f.replace('.md', '')
    const { body } = parseFrontmatter(fs.readFileSync(path.join(brain, f), 'utf8'))
    const heading = body.split('\n').find(l => l.startsWith('#'))?.replace(/^#+\s*/, '') || ''
    const desc = heading || body.split('\n').find(l => l.trim() && !l.startsWith('#'))?.slice(0, 70) || '—'
    rows.push(`  ${topic.padEnd(20)} ${desc}`)
  }
  return `Brain topics for ${path.basename(cwd)}:\n${rows.join('\n')}`
}

// ─── get_project_context ─────────────────────────────────────────────────────

const getProjectContextInputSchema = lazySchema(() => z.strictObject({}))
type GetProjectContextInputSchema = ReturnType<typeof getProjectContextInputSchema>

export const GetProjectContextTool = buildTool({
  name: 'get_project_context',
  searchHint: 'read the project README and today session from vault',
  maxResultSizeChars: 50_000,
  async description() {
    return "Read the project README and today's session log from the vault."
  },
  async prompt() {
    return "Use get_project_context to read the full project README and today's session log. This is auto-injected at startup but may be truncated."
  },
  get inputSchema(): GetProjectContextInputSchema { return getProjectContextInputSchema() },
  get outputSchema() { return outputSchema() },
  userFacingName() { return 'get_project_context' },
  isEnabled,
  isReadOnly() { return true },
  isConcurrencySafe() { return true },
  renderToolUseMessage() { return null },
  async checkPermissions(input) { return { behavior: 'allow', updatedInput: input } },
  async call(_input) {
    const vault = getVaultPath()
    if (!vault) return { data: { result: 'No Obsidian vault configured.' } }
    const cwd = getCwd()

    try {
      const readme = projectNotePath(vault, cwd)
      const sf = sessionFilePath(vault, cwd)
      const out: string[] = []
      if (fs.existsSync(readme)) out.push(`=== README ===\n${fs.readFileSync(readme, 'utf8')}`)
      else out.push(`No project README for '${path.basename(cwd)}'`)
      if (fs.existsSync(sf)) out.push(`=== Today's session (${path.basename(sf)}) ===\n${fs.readFileSync(sf, 'utf8')}`)
      return { data: { result: out.join('\n\n') } }
    } catch (e) {
      return { data: { result: `Error reading project context: ${e instanceof Error ? e.message : String(e)}` } }
    }
  },
  mapToolResultToToolResultBlockParam({ result }, toolUseID) {
    return { tool_use_id: toolUseID, type: 'tool_result', content: result }
  },
} satisfies ToolDef<GetProjectContextInputSchema, { result: string }>)

// ─── set_project_context ─────────────────────────────────────────────────────

const setProjectContextInputSchema = lazySchema(() =>
  z.strictObject({
    context: z.string().describe('New content for the Context section of the project README'),
  }),
)
type SetProjectContextInputSchema = ReturnType<typeof setProjectContextInputSchema>

export const SetProjectContextTool = buildTool({
  name: 'set_project_context',
  searchHint: 'update the Context section of the project README in vault',
  maxResultSizeChars: 2000,
  async description() {
    return 'Update the Context section in the project vault README.'
  },
  async prompt() {
    return 'Use set_project_context to update the project overview/context stored in the vault README.'
  },
  get inputSchema(): SetProjectContextInputSchema { return setProjectContextInputSchema() },
  get outputSchema() { return outputSchema() },
  userFacingName() { return 'set_project_context' },
  isEnabled,
  isReadOnly() { return false },
  isConcurrencySafe() { return false },
  renderToolUseMessage() { return null },
  async checkPermissions(input) { return { behavior: 'allow', updatedInput: input } },
  async call({ context }) {
    const vault = getVaultPath()
    if (!vault) return { data: { result: 'No Obsidian vault configured.' } }
    const cwd = getCwd()

    try {
      const readme = projectNotePath(vault, cwd)
      if (!fs.existsSync(readme)) {
        fs.mkdirSync(path.dirname(readme), { recursive: true })
        fs.writeFileSync(readme, `# ${path.basename(cwd)}\n\n## Context\n\n${context}\n\n## Next Steps\n\n\n## Sessions\n\n`)
        return { data: { result: `README created → ${path.relative(vault, readme)}` } }
      }
      fs.writeFileSync(readme, updateSection(fs.readFileSync(readme, 'utf8'), '## Context', context))
      return { data: { result: `Context updated → ${path.relative(vault, readme)}` } }
    } catch (e) {
      return { data: { result: `Error updating context: ${e instanceof Error ? e.message : String(e)}` } }
    }
  },
  mapToolResultToToolResultBlockParam({ result }, toolUseID) {
    return { tool_use_id: toolUseID, type: 'tool_result', content: result }
  },
} satisfies ToolDef<SetProjectContextInputSchema, { result: string }>)

// ─── set_next_steps ──────────────────────────────────────────────────────────

const setNextStepsInputSchema = lazySchema(() =>
  z.strictObject({
    steps: z.string().describe('Next steps content for the project README'),
  }),
)
type SetNextStepsInputSchema = ReturnType<typeof setNextStepsInputSchema>

export const SetNextStepsTool = buildTool({
  name: 'set_next_steps',
  searchHint: 'update the Next Steps section of the project README in vault',
  maxResultSizeChars: 2000,
  async description() {
    return 'Update the Next Steps section in the project vault README.'
  },
  async prompt() {
    return 'Use set_next_steps to record what should be worked on in future sessions.'
  },
  get inputSchema(): SetNextStepsInputSchema { return setNextStepsInputSchema() },
  get outputSchema() { return outputSchema() },
  userFacingName() { return 'set_next_steps' },
  isEnabled,
  isReadOnly() { return false },
  isConcurrencySafe() { return false },
  renderToolUseMessage() { return null },
  async checkPermissions(input) { return { behavior: 'allow', updatedInput: input } },
  async call({ steps }) {
    const vault = getVaultPath()
    if (!vault) return { data: { result: 'No Obsidian vault configured.' } }
    const cwd = getCwd()

    try {
      const readme = projectNotePath(vault, cwd)
      if (!fs.existsSync(readme)) return { data: { result: `No project README for '${path.basename(cwd)}'` } }
      fs.writeFileSync(readme, updateSection(fs.readFileSync(readme, 'utf8'), '## Next Steps', steps))
      return { data: { result: `Next steps updated → ${path.relative(vault, readme)}` } }
    } catch (e) {
      return { data: { result: `Error updating next steps: ${e instanceof Error ? e.message : String(e)}` } }
    }
  },
  mapToolResultToToolResultBlockParam({ result }, toolUseID) {
    return { tool_use_id: toolUseID, type: 'tool_result', content: result }
  },
} satisfies ToolDef<SetNextStepsInputSchema, { result: string }>)
