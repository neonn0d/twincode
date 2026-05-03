# twincode.wtf

## Hero

```
░        ░░  ░░░░  ░░        ░░   ░░░  ░
▒▒▒▒  ▒▒▒▒▒  ▒  ▒  ▒▒▒▒▒  ▒▒▒▒▒    ▒▒  ▒
▓▓▓▓  ▓▓▓▓▓        ▓▓▓▓▓  ▓▓▓▓▓  ▓  ▓  ▓
████  █████   ██   █████  █████  ██    █
████  █████  ████  ██        ██  ███   █
```
*(source: `src/components/logoArt.js` — use this exact art, monospace font)*

## Color palette

Use these exact colors — pulled straight from the terminal:

| Role | Hex | Usage |
|---|---|---|
| Background | `#0d1117` | page background, dark |
| Logo / accent | `#64b4ff` | ASCII art, links, highlights |
| Primary text | `#e6edf3` | body text |
| Dim text | `#6e7681` | secondary info, path, version |
| Branch / yellow | `#dcb450` | git branch name |
| Success / green | `#64c878` | checkmark, success states |
| Warning / orange | `#ffa03c` | dirty git state |

Font: any monospace — `JetBrains Mono`, `Fira Code`, `monospace` fallback.

The vibe is the terminal itself: dark background, that specific blue, everything else muted.

AI coding agent. Your terminal. DeepSeek.

`npm install && twin`

---

## What it is

Claude Code, but running on DeepSeek. Same workflow, fraction of the cost.

You get file editing, bash execution, agents, MCP servers, and slash commands — all in your terminal, all on your own API key.

No subscription. No cloud account. Just paste your key and go.

---

## Why

DeepSeek v4 Pro is genuinely good at code. And unlike the hosted options, you're paying per token — not a monthly flat rate for something you might use three times a week.

twin is the wrapper that makes DeepSeek feel like a proper coding agent instead of a chat window.

---

## Models

- **deepseek-v4-pro** — most capable, recommended
- **deepseek-v4-flash** — fast v4
- **deepseek-chat** — cheap and quick
- **deepseek-reasoner** — thinks before it answers

Switch anytime with `/key` or pick during setup.

---

## Memory

twin connects to your Obsidian vault. At the start of every session it loads what you were working on. At the end it saves what happened and what's next.

No more re-explaining the project every time you open a new terminal.

---

## Install

```bash
git clone https://github.com/neonn0d/twin
cd twin
npm install && npm run build
ln -s $(pwd)/bin/twin /usr/local/bin/twin
twin
```

Get a DeepSeek API key at platform.deepseek.com. First run walks you through the rest.

---

## Built by @neonn0d
