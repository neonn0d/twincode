import * as React from 'react'
import type { LocalJSXCommandCall } from '../../types/command.js'

export const call: LocalJSXCommandCall = async (onDone) => {
  const cwd = process.cwd()

  onDone('Scanning project for twin brain…', {
    display: 'system',
    shouldQuery: true,
    metaMessages: [
      `You are updating the twin brain for this project. Scan the codebase and sync brain notes in Obsidian using the twin-memory MCP.

Working directory: "${cwd}"

## Step 1 — Check what brain already exists

Call list_knowledge with cwd="${cwd}". If brain notes exist, call get_knowledge for each topic to read the current content. This is your baseline — you need to know what was already saved so you only update what has actually changed.

Also look at the session history already injected in your context (## Today's sessions and ## Project memory). Use it to understand what changed recently — new files added, patterns discovered, architecture decisions made.

## Step 2 — Scan the codebase

Read these files (skip ones that won't give new info beyond what's already in the brain):
- package.json / Cargo.toml / pyproject.toml / go.mod (stack, deps, scripts)
- README.md
- tsconfig.json / biome.json / .eslintrc
- Directory structure (ls, find) — look for new folders or packages since the last scan
- Key source files — focus on areas that changed or weren't covered before

**AI rules — read all that exist:**
- TWIN.md, CLAUDE.md, CLAUDE.local.md
- .cursorrules, .cursor/rules/ (any .md files inside)
- .github/copilot-instructions.md
- .windsurfrules, .clinerules, .aiderignore
- Any file named AGENTS.md, RULES.md at the root

**Design docs — read all that exist:**
- DESIGN.md, design.md, docs/design.md
- Any file with "design", "style", "brand", "ui", "ux" in the name under docs/ or root
- Figma links or design system references in README or docs

## Step 3 — Update only what changed

For each brain topic, compare what you found with what was already saved:
- **If nothing changed** — skip it, don't rewrite
- **If new info was discovered** — merge it into the existing note and call save_knowledge
- **If a topic doesn't exist yet** — create it

Topics to maintain:
**architecture** — monorepo structure, apps/packages, data flow, key entry points, tech stack
**patterns** — coding patterns (routes, components, state, API calls, imports)
**files** — map of important files and where to find things
**commands** — build, test, lint, dev server commands (non-obvious ones)
**rules** — all AI/coding rules consolidated from all rule files found
**design** — design system, UI patterns, brand guidelines, Figma links (only if design docs exist)

## Step 4 — Create or update TWIN.md

Check if TWIN.md exists at the project root (use Bash: test -f TWIN.md && echo exists || echo missing).

**If TWIN.md does not exist — create it.** Write a focused TWIN.md that captures what you just scanned. This should be better than what /init produces because you've already read everything deeply.

Include only what twin would get wrong without it:
- Build, test, lint, dev server commands — especially non-obvious ones (skip standard \`npm test\`, \`cargo test\` etc.)
- Code style rules that differ from language defaults
- Non-obvious gotchas, architectural decisions, required env vars
- Repo conventions (branch naming, PR process, commit style)
- Key entry points and how data flows through the system
- Important parts from any AI rule files found (RULES.md, .cursorrules, .github/copilot-instructions.md, etc.)

Exclude: file lists, generic advice, anything twin already knows, standard commands obvious from package.json.

Prefix with:
\`\`\`
# TWIN.md

This file provides guidance to twin when working with code in this repository.
\`\`\`

**If TWIN.md already exists** — read it, then update only what's stale or missing. Don't rewrite things that are still accurate. Add a line for anything you discovered that isn't covered. If it's already comprehensive, leave it alone.


## Step 5 — Update project README if needed

If the project's context, stack, or goals changed since the last scan, call set_project_context with cwd="${cwd}" to update it. Otherwise skip.

## Writing style — use save_knowledge structured fields

save_knowledge generates proper Obsidian markdown from structured data. Pass the right fields — don't write raw markdown yourself:

- **summary** — 1-2 sentences on what this note covers
- **sections** — list of \`{heading, content}\` for each major topic area. Content supports inline markdown: **bold**, *italic*, ==highlight==, \`code\`, [[wikilink to another brain note]]
- **items** — list of \`{item, detail}\` → table. Use for: file maps, route lists, command lists, package descriptions, anything A → B
- **discoveries** — key insights → \`> [!info]\` blue callouts
- **warnings** — gotchas, non-obvious constraints → \`> [!warning]\` orange callouts
- **tips** — best practices, recommended approaches → \`> [!tip]\` cyan callouts
- **questions** — open unknowns, things to investigate → \`> [!question]\` yellow callouts
- **tasks** — things to explore or verify → \`- [ ]\` task list
- **diagram** — mermaid body (no fences). Use for: architecture (graph TD), data flow (sequenceDiagram), git branching (gitGraph), ratios (pie)
- **patterns** — list of \`{name, language, code}\` for real code examples → labelled fenced code blocks

Use all fields that are relevant. A good brain note has at minimum: summary + sections + items or patterns. Use ==highlights== inside section content to mark the most important things.

## Rules
- Be specific: actual file paths and real code beats vague descriptions
- Don't duplicate info across topics — each note should be distinct
- Merge new info into existing notes, don't blow away what was there
- No asking, no skipping — scan, compare, update`,
    ],
  })
  return null
}
