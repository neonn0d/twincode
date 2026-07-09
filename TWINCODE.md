# TWINCODE.md

This file provides guidance to twincode when working with code in this repository.

## Build

```sh
npm run build        # compile src/ → dist/cli.mjs (always do this after editing source)
npm test             # run tests
npm run typecheck    # type check only
```

**Never edit `dist/cli.mjs` directly.** Always edit source in `src/`, then build.

## Development modes

```sh
npm run dev                    # build + run
npm run dev:fast               # local ollama fast mode
npm run dev:code               # local qwen2.5-coder mode
npm run dev:grpc               # gRPC test server
npm run dev:provider:fast      # DeepSeek fast mode
```

## Stack

- TypeScript / Bun (ES modules, react-jsx)
- Terminal UI: Ink (React for terminals)
- Build: `bun run scripts/build.ts` (via npm scripts)
- Config: `~/.twincode/settings.json` (global) + per-project `.twincode/`
- AI: Multi-provider (DeepSeek, OpenAI, Codex, Gemini, Ollama) via `src/services/api/`

## Key entry points

- `bin/twin` — CLI entry, wipes provider env vars, runs onboarding
- `src/main.tsx` — boot sequence, feature flags, session initialization
- `src/screens/REPL.tsx` — main interactive terminal UI
- `src/commands.ts` — slash command registry (~70 commands)
- `src/constants/prompts.ts` — system prompt builder (skill/memory injection)
- `src/utils/config.ts` — global + project config management

## Architecture

- `src/tools/` — tool implementations (Bash, Read, Edit, Write, Glob, Grep, Agent, etc.)
- `src/services/api/` — API layer: `claude.ts` (Anthropic) + `openaiShim.ts` (OpenAI-compatible shim)
- `src/components/` — Ink/React terminal UI components
- `src/hooks/` — custom React hooks for REPL state management
- `src/ink/` — custom Ink reconciler and terminal rendering
- `src/bridge/` — remote bridge mode (teleport sessions across devices)
- `src/assistant/` — assistant mode (behind KAIROS feature flag)
- `src/memdir/` — memory directory scanning (Obsidian vaults)
- `mcp/server.js` — Obsidian MCP server for vault memory integration
- `src/tools/AgentTool/built-in/` — subagents: explore, plan, verification, twin-guide

## Skills system

Skills live in `.twincode/skills/<name>/SKILL.md` (project) or `~/.twincode/skills/<name>/SKILL.md` (global).

```markdown
---
name: skill-name
description: One sentence describing when to use this.
---

Full skill instructions here.
```

Skills are injected into the system prompt at startup via `loadSkillsSection()` in `src/constants/prompts.ts`.

## Slash commands

Commands are registered in `src/commands.ts`. Each command lives in `src/commands/<name>/` with an `index.js` or `index.tsx`. Key commands:

- `/save` — persist session to Obsidian
- `/load` / `/recall` — memory retrieval
- `/model` — switch AI model
- `/provider` — switch provider (DeepSeek, OpenAI, Codex, etc.)
- `/skills` — skills CRUD TUI
- `/memory` — memory management
- `/twinit` — scan project and update brain notes

## Feature flags

Feature flags use `bun:bundle feature()` for dead code elimination. Key flags:
- `TEAMMEM` — team memory sync
- `CCR_AUTO_CONNECT` — auto-connect to bridge
- `KAIROS` — assistant mode

## Testing

Tests use Bun's test runner. Run with `npm test`. Test files are colocated with source: `*.test.ts` or `*.test.tsx`.

## Project context

This IS the twincode codebase. TwinCode is a fork of Claude Code that runs on any OpenAI-compatible provider (DeepSeek, StepFun, OpenRouter, Ollama, or Claude via Evolink). When editing code here, you're working on the twin tool itself.

Memory scope: "project memory" means the twin tool's brain notes and memory system, not external websites or docs.
