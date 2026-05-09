import * as React from 'react'
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'
import { homedir, platform } from 'os'
import type { LocalJSXCommandCall } from '../../types/command.js'
import { getInitialSettings } from '../../utils/settings/settings.js'

function getObsidianConfigPath(): string {
  const plat = platform()
  if (plat === 'linux') {
    const native = join(homedir(), '.config', 'obsidian', 'obsidian.json')
    const flatpak = join(homedir(), '.var', 'app', 'md.obsidian.Obsidian', 'config', 'obsidian', 'obsidian.json')
    return existsSync(native) ? native : flatpak
  }
  if (plat === 'darwin') return join(homedir(), 'Library', 'Application Support', 'obsidian', 'obsidian.json')
  return join(process.env.APPDATA || '', 'obsidian', 'obsidian.json')
}

export const call: LocalJSXCommandCall = async (onDone) => {
  const cwd = process.cwd()
  const settings = getInitialSettings() as Record<string, unknown>
  const vault = settings.obsidianVault as string | undefined

  if (!vault) {
    const obsidianConfigPath = getObsidianConfigPath()

    onDone('Setting up vault…', {
      display: 'system',
      shouldQuery: true,
      metaMessages: [
        `No Obsidian vault is configured yet. Your job is to find the vault path and save it to settings before we can use /twinit.

## Setup steps

### 1 — Find the Obsidian vault

Read this file with the Read tool: \`${obsidianConfigPath}\`

Parse the JSON. The "vaults" object has entries like \`{ "<id>": { "path": "/absolute/path/to/vault" } }\`. Extract all paths.

- If 1 vault found: confirm it with the user ("Found vault: <path> — use it? [Y/n]")
- If multiple vaults: list them numbered and ask which one
- If none / file missing: ask the user to paste their vault path

### 2 — Save vault path to settings

Once you have the vault path confirmed, call the updateSettingsForSource tool is NOT available here.

Instead, use the Bash tool to write the vault path to twincode settings:

Read the file \`~/.twincode/settings.json\` (or use \`{}\` if it doesn't exist), add \`"obsidianVault": "<confirmed vault path>"\`, then write it back.

Example:
\`\`\`bash
# Read current settings
cat ~/.twincode/settings.json 2>/dev/null || echo '{}'
\`\`\`

Then write back with obsidianVault added using the Write tool at path \`${join(homedir(), '.twincode', 'settings.json')}\`.

### 3 — Tell the user

Say:
"✔ Vault configured: <path>

**Restart twincode** for the tools to activate, then run **/twinit** again to scan your project."

Do not proceed with any code scanning — just complete steps 1–3 above.`,
      ],
    })
    return null
  }

  onDone('Scanning project for twincode brain…', {
    display: 'system',
    shouldQuery: true,
    metaMessages: [
      `You are updating the twincode brain for this project. Scan the codebase and save brain notes using the save_knowledge tool.

Working directory: "${cwd}"
Vault: "${vault}"

## Step 1 — Check what brain already exists

Call list_knowledge (no args needed). If brain notes exist, call get_knowledge with each topic to read the current content. This is your baseline — only update what has actually changed.

Also look at the session history already injected in your context (## Today's sessions and ## Project memory). Use it to understand what changed recently.

## Step 2 — Scan the codebase

Read these files (skip ones that won't give new info beyond what's already in the brain):
- package.json / Cargo.toml / pyproject.toml / go.mod (stack, deps, scripts)
- README.md
- tsconfig.json / biome.json / .eslintrc
- Directory structure (ls, find) — look for new folders or packages since the last scan
- Key source files — focus on areas that changed or weren't covered before

**AI rules — read all that exist:**
- TWINCODE.md, CLAUDE.md, CLAUDE.local.md
- .cursorrules, .cursor/rules/ (any .md files inside)
- .github/copilot-instructions.md
- .windsurfrules, .clinerules, .aiderignore
- Any file named AGENTS.md, RULES.md at the root

**Design docs — read all that exist:**
- DESIGN.md, design.md, docs/design.md
- Any file with "design", "style", "brand", "ui", "ux" in the name under docs/ or root

## Step 3 — Update only what changed

For each brain topic, compare what you found with what was already saved:
- **If nothing changed** — skip it, don't rewrite
- **If new info was discovered** — call save_knowledge (it merges automatically)
- **If a topic doesn't exist yet** — create it

Topics to maintain:
**architecture** — monorepo structure, apps/packages, data flow, key entry points, tech stack
**patterns** — coding patterns (routes, components, state, API calls, imports)
**files** — map of important files and where to find things
**commands** — build, test, lint, dev server commands (non-obvious ones)
**rules** — all AI/coding rules consolidated from all rule files found
**design** — design system, UI patterns, brand guidelines (only if design docs exist)

## Step 4 — Create or update TWINCODE.md

Check if TWINCODE.md exists at the project root (use Bash: test -f TWINCODE.md && echo exists || echo missing).

**If TWINCODE.md does not exist — create it.** Write a focused TWINCODE.md that captures what you just scanned.

Include only what twincode would get wrong without it:
- Build, test, lint, dev server commands — especially non-obvious ones
- Code style rules that differ from language defaults
- Non-obvious gotchas, architectural decisions, required env vars
- Repo conventions (branch naming, PR process, commit style)
- Key entry points and how data flows through the system
- Important parts from any AI rule files found

Prefix with:
\`\`\`
# TWINCODE.md

This file provides guidance to twincode when working with code in this repository.
\`\`\`

**If TWINCODE.md already exists** — read it, then update only what's stale or missing.

## Step 5 — Update project README if needed

Call get_project_context to read the current README. If the project context, stack, or goals changed since the last scan, call set_project_context to update it. Otherwise skip.

## save_knowledge field guide

- **summary** — 1-2 sentences on what this note covers
- **sections** — list of \`{heading, content}\` for each major topic area
- **items** — list of \`{item, detail}\` → table (file maps, routes, command lists)
- **discoveries** — key insights → \`> [!info]\` callouts
- **warnings** — gotchas → \`> [!warning]\` callouts
- **tips** — best practices → \`> [!tip]\` callouts
- **questions** — open unknowns → \`> [!question]\` callouts
- **tasks** — things to explore → task list
- **diagram** — mermaid body (no fences)
- **patterns** — list of \`{name, language, code}\` for code examples

## Rules
- Be specific: actual file paths and real code beats vague descriptions
- Don't duplicate info across topics — each note should be distinct
- Merge new info into existing notes, don't blow away what was there
- No asking, no skipping — scan, compare, update`,
    ],
  })
  return null
}
