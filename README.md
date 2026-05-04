# twin

AI coding agent powered by DeepSeek. Runs in your terminal.

www.twincode.wtf | @neonn0d

## what it is

Fork of Claude Code that runs on the DeepSeek API. Same workflow: file editing, bash, agents, MCP, slash commands. No Anthropic account needed.

## install

```bash
git clone https://github.com/neonn0d/twin
cd twin
npm install
npm run build
npm link
```

Then just run `twin` anywhere.

First launch walks you through setup: DeepSeek API key, model choice, optional Obsidian vault for memory.

## models

| model | notes |
|---|---|
| `deepseek-v4-pro` | most capable, recommended |
| `deepseek-v4-flash` | fast v4 |
| `deepseek-chat` | fast and cheap |
| `deepseek-reasoner` | step by step reasoning |

Get a key at [platform.deepseek.com](https://platform.deepseek.com).

## commands

| command | what it does |
|---|---|
| `/key <api-key>` | update your DeepSeek API key |
| `/logout` | wipe your key and reset |
| `/help` | list all commands |

## memory

twin has project memory via Obsidian. Connect a vault during onboarding and twin will track context, progress, and session notes automatically.

Notes go in `twin/<project>/README.md` inside your vault. Requires Python 3.

## config

`~/.twin/settings.json` for settings. `~/.twin/TWIN.md` for personal instructions loaded in every session.

## requirements

- Node.js 18+
- Python 3 (optional, for memory)
- DeepSeek API key

## license

MIT
