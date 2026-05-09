# TwinCode — Project Overview

## What is TwinCode?

TwinCode is an open-source AI coding agent that runs in your terminal. It is a fork of Claude Code (Anthropic's official CLI) rewired to run on the **DeepSeek API** — giving you a powerful, autonomous coding agent at a fraction of the cost.

You talk to it like a developer. It reads your code, edits files, runs commands, fixes bugs, and works through complex tasks autonomously.

---

## How it Works

### Architecture

TwinCode is built on top of the Claude Code engine. The engine handles:

- Reading and editing files across the entire codebase
- Running shell commands and interpreting their output
- Managing conversation context and tool use
- Permission and safety controls

TwinCode replaces Claude (the model) with **DeepSeek** by routing all API calls through DeepSeek's OpenAI-compatible endpoint (`api.deepseek.com/v1`). The engine stays the same. The model changes.

### Model Routing

TwinCode sets `CLAUDE_CODE_USE_OPENAI=1` and points `OPENAI_BASE_URL` to DeepSeek's API. This activates the OpenAI-compatible provider path inside the engine. When this flag is active, a lean system prompt is used instead of the full one to reduce token usage with smaller models.

### Supported Models

| Model | Description |
|---|---|
| `deepseek-v4-pro` | Most capable, best for complex tasks |
| `deepseek-v4-flash` | Fast version of v4 |
| `deepseek-chat` | Fast and cheap, everyday use |
| `deepseek-reasoner` | Thinks step by step, best for hard problems |

---

## Features

### Core Agent Capabilities
- **File operations** — read, write, edit files across your whole project
- **Shell execution** — run commands, interpret output, chain tasks
- **Autonomous multi-step tasks** — works through complex problems without hand-holding
- **Codebase-wide context** — understands your entire project structure

### Skills System
TwinCode has a pi-agent style skills system. Skills are markdown files in `.twincode/skills/` (project) or `~/.twincode/skills/` (global). Each skill is a folder with a `SKILL.md` file containing frontmatter (`name`, `description`) and instruction content.

At startup, all skills are injected into the system prompt as `<available_skills>` XML — the model sees them automatically and applies the right one when the task matches.

Manage skills via the `/skills` menu (browse, create with AI, edit, delete).

### Memory (Obsidian Integration)
TwinCode has an optional memory layer powered by an MCP server that reads and writes to an **Obsidian vault**. This gives TwinCode persistent memory across sessions:

- Session context and notes
- Project README auto-loaded at startup
- Brain knowledge base (persistent notes per topic)
- Full note management via native twin MCP tools

### Agents
Create specialized subagents that TwinCode can delegate to. Agents live in `.twincode/agents/`. Built-in agents (Explore, Plan, twin-guide, etc.) are always available.

### Slash Commands

| Command | Description |
|---|---|
| `/skills` | Browse, create, edit, delete skills |
| `/agents` | Browse and create custom subagents |
| `/model` | Switch AI model |
| `/compact` | Compress conversation context |
| `/plan` | Enter planning mode |
| `/save` | Log current session to Obsidian |
| `/key <key>` | Update your DeepSeek API key |

---

## Setup & Configuration

### First Run
On first launch, TwinCode runs an interactive onboarding wizard that:
1. Prompts for your DeepSeek API key
2. Lets you pick a default model
3. Detects your Obsidian vault and sets up memory (optional)

All settings are saved to `~/.twincode/settings.json`.

### Settings File (`~/.twincode/settings.json`)
```json
{
  "model": "deepseek-v4-flash",
  "env": {
    "OPENAI_BASE_URL": "https://api.deepseek.com/v1",
    "OPENAI_API_KEY": "sk-...",
    "OPENAI_MODEL": "deepseek-v4-flash"
  },
  "obsidianVault": "/path/to/your/vault",
  "permissions": { "allow": ["Read(**)", "mcp__twin__*"] }
}
```

### MCP Config (`~/.twincode.json`)
Stores MCP server configurations. TwinCode automatically registers the `twin` MCP server here during onboarding.

---

## Project Structure

```
twincode/
├── bin/
│   └── twin              # Entry point — onboarding, permissions, env setup, launches engine
├── src/
│   ├── commands/
│   │   ├── skills/       # /skills command → SkillsManager CRUD TUI
│   │   ├── skill-new/    # /skill-new command — AI skill generation
│   │   └── agents/       # /agents command
│   ├── components/
│   │   ├── skills/
│   │   │   ├── SkillsManager.tsx  # Full CRUD skills TUI (list/create/delete/edit)
│   │   │   └── generateSkill.ts   # AI skill content generation
│   │   └── agents/
│   │       ├── AgentsList.tsx
│   │       └── generateAgent.ts
│   ├── constants/
│   │   └── prompts.ts    # System prompt builder — skill injection, vault injection
│   ├── keybindings/
│   │   └── defaultBindings.ts  # Keyboard shortcut map
│   ├── skills/
│   │   └── loadSkillsDir.ts    # Disk scanner for SKILL.md files
│   └── tools/
│       └── AgentTool/built-in/ # Built-in agents (twin-guide, Explore, Plan, etc.)
├── dist/
│   └── cli.mjs           # Built output (run `npm run build`)
└── README.md
```

---

## Development

```bash
npm install
npm run build   # always run from /path/to/twincode after source changes
./bin/twin
```

Built with **Bun** + **TypeScript**. UI rendered with **Ink** (React for terminals).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Language | TypeScript |
| Build | Bun |
| Terminal UI | Ink (React) |
| AI Provider | DeepSeek API (OpenAI-compatible) |
| Memory | Obsidian + MCP (twin MCP server) |
| Base | Claude Code (forked) |

---

## Links

- Website: [twincode.wtf](https://twincode.wtf)
- Repo: [github.com/neonn0d/twincode](https://github.com/neonn0d/twincode)
- DeepSeek API: [platform.deepseek.com](https://platform.deepseek.com)
- Built by [@neonn0d](https://github.com/neonn0d)
