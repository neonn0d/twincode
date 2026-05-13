# twin

AI coding agent for your terminal. Runs on any provider.

www.twincode.wtf | @neonn0d

---

## What it is

Fork of Claude Code that works with any LLM provider — DeepSeek, StepFun, OpenRouter, Ollama, or any OpenAI-compatible API. Also supports Claude via Evolink. Same workflow: file editing, bash, agents, MCP, slash commands.

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

Run `twin` anywhere. First launch walks you through setup.

**Requirements:** Node.js 18+

---

## Providers

Switch providers anytime with `/switch`.

| provider | notes |
|---|---|
| **Evolink** | Claude models via Anthropic API — [evolink.ai](https://evolink.ai) |
| **DeepSeek** | Best for coding, very cheap — [platform.deepseek.com](https://platform.deepseek.com) |
| **StepFun** | step-3.5-flash, fast — [platform.stepfun.ai](https://platform.stepfun.ai) |
| **OpenRouter** | 200+ models, one key — [openrouter.ai](https://openrouter.ai) |
| **Ollama** | Local models, no key needed — [ollama.com](https://ollama.com) |
| **Custom** | Any OpenAI-compatible API |

Provider keys are saved in `~/.twincode/settings.json` and persist across sessions. Switch between configured providers instantly.

---

## Commands

| command | what it does |
|---|---|
| `/switch` | switch provider or add API keys |
| `/model` | switch model (shows only models for active provider) |
| `/skills` | browse, create, edit, delete skills |
| `/agents` | browse and create custom subagents |
| `/effort` | set reasoning effort level |
| `/compact` | compress context |
| `/plan` | enter planning mode |
| `/save` | log session to Obsidian |
| `/logout` | wipe keys and reset |

---

## Memory

Twin connects to your Obsidian vault. At session start it loads your project context, today's notes, and brain topics. Use `/save` to log what happened.

Notes go in `twincode/<project>/` inside your vault. Requires the twin MCP server.

---

## Config

| path | purpose |
|---|---|
| `~/.twincode/settings.json` | providers, API keys, model, permissions |
| `~/.twincode/TWINCODE.md` | personal instructions loaded every session |
| `~/.twincode/skills/` | global skills |
| `.twincode/skills/` | project-level skills |
| `.twincode/agents/` | project-level custom agents |

---

## License

MIT
