# Twin — Project Overview

## What is Twin?

Twin is an open-source AI coding agent that runs entirely in your terminal. It is a fork of Claude Code (Anthropic's official CLI) rewired to run on the **DeepSeek API** — giving you a powerful, autonomous coding agent at a fraction of the cost.

You talk to it like a developer. It reads your code, edits files, runs commands, fixes bugs, and works through complex tasks autonomously.

---

## How it Works

### Architecture

Twin is built on top of the Claude Code engine — the same battle-tested agentic loop that powers Anthropic's own CLI. The engine handles:

- Reading and editing files across the entire codebase
- Running shell commands and interpreting their output
- Managing conversation context and tool use
- Permission and safety controls

Twin replaces Claude (the model) with **DeepSeek** by routing all API calls through DeepSeek's OpenAI-compatible endpoint (`api.deepseek.com/v1`). The engine stays the same. The model changes.

### Model Routing

Twin sets `CLAUDE_CODE_USE_OPENAI=1` and points `OPENAI_BASE_URL` to DeepSeek's API. This activates the OpenAI-compatible provider path inside the engine, which uses `OPENAI_MODEL` to select the active model. All of this is configured automatically on first run.

### Supported Models

| Model | Description |
|---|---|
| `deepseek-v4-pro` | Most capable, best for complex tasks |
| `deepseek-v4-flash` | Fast version of v4 |
| `deepseek-chat` | Fast and cheap, everyday use |
| `deepseek-reasoner` | Thinks step by step, best for hard problems |

You can switch models anytime with `/model` inside a session. Your choice persists across restarts.

---

## Features

### Core Agent Capabilities
- **File operations** — read, write, edit files across your whole project
- **Shell execution** — run commands, interpret output, chain tasks
- **Autonomous multi-step tasks** — works through complex problems without hand-holding
- **Codebase-wide context** — understands your entire project structure

### Memory (Obsidian Integration)
Twin has an optional memory layer powered by an MCP (Model Context Protocol) server that reads and writes to an **Obsidian vault**. This gives Twin persistent memory across sessions:

- Session context (what you're working on, current state)
- Project notes and documentation
- Next steps and progress tracking
- Full note management (create, edit, search, organize)

The MCP server (`mcp/twin-memory.py`) runs as a subprocess and communicates via stdio. It is configured automatically during onboarding if you have Obsidian installed.

### Slash Commands
Twin exposes a rich set of slash commands inside the interactive session:

| Command | Description |
|---|---|
| `/model` | Switch AI model |
| `/compact` | Compress conversation context |
| `/review` | Review current code changes |
| `/commit` | Commit changes with AI message |
| `/branch` | Create a branch from current work |
| `/plan` | Enter planning mode |
| `/status` | Show session status |
| `/exit` | End session |

And many more — type `/` to see all available commands.

---

## Setup & Configuration

### First Run
On first launch, Twin runs an interactive onboarding wizard that:
1. Prompts for your DeepSeek API key
2. Lets you pick a default model
3. Detects your Obsidian vault and sets up memory (optional)

All settings are saved to `~/.twin/settings.json`.

### Settings File (`~/.twin/settings.json`)
```json
{
  "model": "deepseek-v4-flash",
  "env": {
    "OPENAI_BASE_URL": "https://api.deepseek.com/v1",
    "OPENAI_API_KEY": "sk-...",
    "OPENAI_MODEL": "deepseek-v4-flash"
  },
  "obsidianVault": "/path/to/your/vault",
  "permissions": { ... }
}
```

### MCP Config (`~/.twin.json`)
Stores MCP server configurations. Twin automatically registers the `twin-memory` server here during onboarding.

---

## Project Structure

```
twin/
├── bin/
│   └── twin              # Entry point — onboarding, env setup, launches engine
├── src/
│   ├── screens/
│   │   └── REPL.tsx      # Main interactive session UI
│   ├── commands/         # All slash commands (/model, /exit, /plan, etc.)
│   ├── components/       # UI components (Ink/React terminal renderer)
│   ├── utils/            # Model resolution, settings, auth, etc.
│   └── state/            # App state management
├── mcp/
│   ├── twin-memory.py    # Obsidian MCP server
│   └── session-context.py
├── dist/
│   └── cli.mjs           # Built output (run `npm run build`)
└── web.md                # Website content
```

---

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run locally
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
| Memory | Obsidian + MCP (Python) |
| Base | Claude Code (forked) |

---

## Links

- Website: [twincode.wtf](https://twincode.wtf)
- DeepSeek API: [platform.deepseek.com](https://platform.deepseek.com)
- Built by [@neonn0d](https://github.com/neonn0d)
