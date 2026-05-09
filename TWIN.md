# TWIN.md

This file provides guidance to twin when working with code in this repository.

## What this is

This IS the twincode codebase. TwinCode is a fork of Claude Code. When you're here, you're working on yourself.

## Build

```sh
npm run build        # compile src/ → dist/cli.mjs (always do this after editing source)
npm test             # run tests
npm run typecheck    # type check only
```

**Never edit `dist/cli.mjs` directly.** Always edit source in `src/`, then build.

## Structure

- `src/` — all source (TypeScript + TSX)
- `src/commands/` — slash commands (`/save`, `/skills`, `/skill-new`, `/agents`, etc.)
- `src/commands/skills/skills.tsx` — renders SkillsManager CRUD TUI
- `src/commands/skill-new/skill-new.tsx` — AI skill generation form
- `src/components/skills/SkillsManager.tsx` — full skills CRUD (list/create/delete/edit from disk)
- `src/components/skills/generateSkill.ts` — AI skill content generation
- `src/constants/prompts.ts` — system prompt builder (skill injection, vault/brain injection, lean prompt for DeepSeek)
- `src/keybindings/defaultBindings.ts` — keyboard shortcut map (Confirmation context: Enter=yes, Esc=no)
- `src/skills/loadSkillsDir.ts` — disk scanner for SKILL.md files, memoized, clearSkillCaches()
- `src/tools/AgentTool/built-in/` — built-in agents (twin-guide, Explore, Plan, etc.)
- `bin/twin` — CLI entry point, permission registration (4 permission locations)
- `dist/cli.mjs` — compiled output, what users actually run

## Skills system

Skills live in `.twincode/skills/<name>/SKILL.md` (project) or `~/.twincode/skills/<name>/SKILL.md` (global).

SKILL.md format:
```markdown
---
name: skill-name
description: One sentence describing when to use this.
---

Full skill instructions here.
```

Skills are injected into the system prompt at startup via `loadSkillsSection()` in `src/constants/prompts.ts`.

**Cache has TWO layers — always clear both after mutations:**
```ts
clearSkillCaches()               // src/skills/loadSkillsDir.ts
clearCommandMemoizationCaches()  // src/commands.ts
```

SkillsManager reads from disk directly (not from commands context) to bypass stale cache.

## Key patterns

- Slash commands are either `type: 'prompt'` (AI gets text) or `type: 'local-jsx'` (runs a call function first)
- `local-jsx` commands use `onDone(message, { display: 'system', shouldQuery: true, metaMessages: [prompt] })` to show a message then trigger the AI
- `display: 'system'` result goes through `<Markdown>` rendering — bold and backticks work
- Commands are registered in `src/commands.ts` — order in the COMMANDS array controls slash menu order
- Dialog component captures keyboard via `useKeybinding` — add input handlers INSIDE the component rendering Dialog, not in parent wrappers

## MCP server

The twin MCP server is a separate repo (`github.com/neonn0d/twin`). Tools include:
`log_session`, `get_project_context`, `set_project_context`, `set_next_steps`,
`save_knowledge`, `get_knowledge`, `list_knowledge`, `search_knowledge`, and note management tools.

Brain notes: `VAULT/twincode/<rel>/brain/<topic>.md`
Sessions: `VAULT/twincode/<rel>/sessions/<date>.md`

## bin/twin permissions

When adding new MCP tools, update 4 locations in `bin/twin`:
1. `registerMcpServer()` alwaysAllow array
2. `runOnboarding()` permissions.allow array
3. settings.json migration `required` array
4. twin.json merge-missing `alwaysRequired` array
