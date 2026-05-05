# TWIN.md

This file provides guidance to twin when working with code in this repository.

## What this is

This IS the twin codebase. Twin is a fork of Claude Code. When you're here, you're working on yourself.

## Build

```sh
npm run build        # compile src/ → dist/cli.mjs (always do this after editing source)
npm test             # run tests
npm run typecheck    # type check only
```

**Never edit `dist/cli.mjs` directly.** Always edit source in `src/`, then build.

## Structure

- `src/` — all source (TypeScript + TSX)
- `src/commands/` — slash commands (`/save`, `/init`, `/twinit`, etc.)
- `src/constants/prompts.ts` — startup system prompt injection (brain, sessions, mcpInstructions)
- `src/components/` — Ink UI components
- `src/screens/REPL.tsx` — main REPL loop
- `src/services/mcp/client.ts` — MCP tool registration and userFacingName
- `mcp/twin-memory.py` — the twin-memory MCP server (FastMCP, Python)
- `bin/twin` — CLI entry point, permission registration (4 permission locations)
- `dist/cli.mjs` — compiled output, what users actually run

## Key patterns

- Slash commands are either `type: 'prompt'` (AI gets text) or `type: 'local-jsx'` (runs a call function first)
- `local-jsx` commands use `onDone(message, { display: 'system', shouldQuery: true, metaMessages: [prompt] })` to show a message then trigger the AI
- `display: 'system'` result goes through `<Markdown>` rendering — bold and backticks work
- `display: 'skip'` forces `shouldQuery: false` — don't use it if you need the AI to run
- Commands are registered in `src/commands.ts` — order in the COMMANDS array controls slash menu order
- MCP tool names show as `server - toolname` in the UI (no `(MCP)` suffix)

## MCP server (`mcp/twin-memory.py`)

- FastMCP, Python — use `list | None` not `list[str] | None` for optional list params
- Tools: `log_session`, `get_project_context`, `set_project_context`, `set_next_steps`, `save_knowledge`, `get_knowledge`, `list_knowledge`
- Brain notes live in `VAULT/twin/<rel>/brain/<topic>.md`
- Sessions live in `VAULT/twin/<rel>/sessions/<date>.md`

## bin/twin permissions

When adding new MCP tools, update 4 locations in `bin/twin`:
1. `registerMcpServer()` alwaysAllow array
2. `runOnboarding()` permissions.allow array
3. settings.json migration required array
4. twin.json merge-missing alwaysRequired array
