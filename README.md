# twin

AI coding agent powered by DeepSeek. Runs in your terminal.

www.twincode.wtf · @neonn0d

## What it is

twin is a fork of Claude Code that runs on the DeepSeek API. Same terminal-first workflow — file editing, bash, agents, MCP, slash commands — but using DeepSeek models.

## Install

```bash
git clone https://github.com/neonn0d/twin
cd twin
npm install
npm run build
```

Link to your PATH:

```bash
ln -s $(pwd)/bin/twin /usr/local/bin/twin
```

Run:

```bash
twin
```

First launch runs onboarding — enter your DeepSeek API key, pick a model, optionally connect your Obsidian vault.

## Models

| Model | Description |
|---|---|
| `deepseek-v4-pro` | Most capable — recommended |
| `deepseek-v4-flash` | Fast v4 |
| `deepseek-chat` | Fast and cheap |
| `deepseek-reasoner` | Thinks step by step |

Get an API key at [platform.deepseek.com](https://platform.deepseek.com).

## Slash commands

| Command | Description |
|---|---|
| `/key <api-key>` | Change your DeepSeek API key |
| `/logout` | Remove your API key and reset twin |
| `/help` | Show all available commands |

## Obsidian memory

twin has built-in project memory via Obsidian. During onboarding, twin scans for an Obsidian vault and asks if you want to connect it.

Once connected, twin automatically:
- Loads project context at the start of each session
- Logs progress and decisions as you work
- Saves session notes and next steps

Notes live at `twin/<project-path>/README.md` inside your vault.

Requires Python 3. Everything else is handled automatically.

## Config

Settings live in `~/.twin/settings.json`. Personal instructions go in `~/.twin/TWIN.md` — loaded in every session.

## Requirements

- Node.js 18+
- Python 3 (for Obsidian memory, optional)
- DeepSeek API key

## License

MIT
