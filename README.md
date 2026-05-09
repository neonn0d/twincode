# twin

AI coding agent powered by DeepSeek. Runs in your terminal.

www.twincode.wtf | @neonn0d

---

## What it is

Fork of Claude Code that runs on the DeepSeek API. Same workflow: file editing, bash, agents, MCP, slash commands. No Anthropic account needed.

Config lives in `~/.twincode/`. All Claude Code docs apply — just translate `~/.claude/` → `~/.twincode/`.

---

## Install

```bash
git clone https://github.com/neonn0d/twincode
cd twincode
npm install
npm run build
npm link
```

Run `twin` anywhere. First launch walks you through setup: DeepSeek API key, model, optional Obsidian vault for memory.

**Requirements:** Node.js 18+, DeepSeek API key

---

## Models

| model | notes |
|---|---|
| `deepseek-v4-pro` | most capable, recommended |
| `deepseek-v4-flash` | fast v4 |
| `deepseek-chat` | fast and cheap |
| `deepseek-reasoner` | step by step reasoning |

Get a key at [platform.deepseek.com](https://platform.deepseek.com).

---

## Commands

| command | what it does |
|---|---|
| `/skills` | browse, create, edit, delete skills |
| `/agents` | browse and create custom subagents |
| `/model` | switch model |
| `/compact` | compress context |
| `/plan` | enter planning mode |
| `/save` | log session to Obsidian |
| `/key <key>` | update API key |
| `/logout` | wipe key and reset |

---

## Memory

Twin connects to your Obsidian vault. At session start it loads your project context, today's notes, and brain topics. Use `/save` to log what happened.

Notes go in `twincode/<project>/` inside your vault. Requires the twin MCP server.

---

## Config

| path | purpose |
|---|---|
| `~/.twincode/settings.json` | API keys, model, permissions |
| `~/.twincode/TWINCODE.md` | personal instructions loaded every session |
| `~/.twincode/skills/` | global skills |
| `.twincode/skills/` | project-level skills |
| `.twincode/agents/` | project-level custom agents |

---

## For maintainers

See `PROJECT.md` for architecture details and `TWIN.md` for development patterns.

---

## License

MIT
