# twin

AI coding agent powered by DeepSeek. Runs in your terminal.

www.twincode.wtf | @neonn0d

---

## What it is

Fork of Claude Code that runs on the DeepSeek API. Same workflow: file editing, bash, agents, MCP, slash commands. No Anthropic account needed.

Config lives in `~/.twincode/` (not `~/.claude/`). All Claude Code docs apply — translate any reference to `~/.claude/` → `~/.twincode/`.

---

## Install

```bash
git clone https://github.com/neonn0d/twin
cd twin
npm install
npm run build
npm link
```

Run `twin` anywhere. First launch walks you through setup: DeepSeek API key, model, optional Obsidian vault for memory.

**Requirements:** Node.js 18+, Python 3 (optional, for memory), DeepSeek API key.

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
| `/skills` | browse, create, edit, and delete skills |
| `/agents` | browse and create custom subagents |
| `/key <api-key>` | update your DeepSeek API key |
| `/logout` | wipe your key and reset |
| `/help` | list all commands |

---

## Skills

Skills are markdown files that give twin specialized instructions for specific tasks. They live in `.twincode/skills/` (project) or `~/.twincode/skills/` (global).

Each skill is a folder with a `SKILL.md` file:

```
.twincode/skills/
  my-skill/
    SKILL.md
```

**SKILL.md format:**
```markdown
---
name: my-skill
description: One sentence describing when to use this skill.
---

Your full skill instructions here...
```

Twin injects all skills into the system prompt at startup — the model reads them automatically and applies the right one when the task matches.

### Managing skills via `/skills`

| key | action |
|---|---|
| `↑ ↓` or `j k` | navigate |
| `c` | create new skill (AI-generated from your description) |
| `d` | delete selected skill |
| `e` | edit selected skill in `$EDITOR` |
| `Esc` | close |

---

## Memory

Twin has project memory via Obsidian. Connect a vault during onboarding and twin tracks context, session notes, and brain knowledge automatically.

Notes go in `twin/<project>/` inside your vault. Use `/save` to log the current session.

---

## Agents

Create specialized subagents that twin can delegate to. Agents live in `.twincode/agents/`. Built-in agents (Explore, Plan, twin-guide, etc.) are always available.

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

## Architecture (for maintainers)

```
src/
  commands/
    skills/skills.tsx       # /skills command — renders SkillsManager
    skill-new/skill-new.tsx # /skill-new command — AI skill generation form
    agents/                 # /agents command
  components/
    skills/
      SkillsManager.tsx     # CRUD TUI: list/create/delete/edit skills from disk
      generateSkill.ts      # calls AI to generate skill content from a prompt
    agents/
      AgentsList.tsx        # agents browser
      generateAgent.ts      # AI agent generation
    design-system/
      Dialog.tsx            # base dialog component
  constants/
    prompts.ts              # system prompt builder
                            # loadSkillsSection() — injects .twincode/skills/ into prompt
                            # buildVaultInjection() — injects Obsidian vault context
  keybindings/
    defaultBindings.ts      # keyboard shortcut map
                            # Confirmation context: Enter=yes, Esc=no (n/y removed)
  skills/
    loadSkillsDir.ts        # scans disk for SKILL.md files, memoized
                            # clearSkillCaches() — clears memoization
  tools/
    AgentTool/
      built-in/             # built-in agents (twin-guide, Explore, Plan, etc.)
bin/
  twin                      # launcher: onboarding, permissions migration, env setup
```

### Key patterns

**Skill loading has two cache layers.** Always clear both after mutations:
```ts
clearSkillCaches()               // src/skills/loadSkillsDir.ts
clearCommandMemoizationCaches()  // src/commands.ts
```

**Skills are injected into the system prompt** via `loadSkillsSection()` in `src/constants/prompts.ts`. Reads `.twincode/skills/` at startup, formats as `<available_skills>` XML.

**SkillsManager reads from disk directly** (no cache) so the list is always live. `context.options.commands` is a frozen snapshot from session start — don't use it for skills display.

**Dialog captures keyboard input** via `useKeybinding`. Add `useInput` handlers inside the component that renders the Dialog, not in a parent wrapper.

**Adding a new always-allowed permission:** add it to `bin/twin` in both the onboarding `permissions.allow` array AND the migration block (`required` array) so existing users get it on next launch.

---

## License

MIT
