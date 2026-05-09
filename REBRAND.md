# twin → twincode Rebrand Map

Complete list of every file touched and what changed.

---

## New Files

| File | What |
|------|------|
| `bin/twincode` | New binary entrypoint (copied from `bin/twin` with all updates + migration logic) |

---

## Renamed / Core Identity

| File | Change |
|------|--------|
| `package.json` | `"name": "twin"` → `"twincode"`, bin key `"twin"` → `"twincode"`, bin path `"./bin/twin"` → `"./bin/twincode"` |
| `bin/twin` | `process.title = 'twin'` → `'twincode'`; `TWIN_DIR = ~/.twin` → `~/.twincode`; `TWIN_JSON_PATH = ~/.twin.json` → `~/.twincode.json`; added `renameSync` migration block; display strings |

---

## Global Config Directory (150+ callers affected)

| File | Change |
|------|--------|
| `src/utils/envUtils.ts` | `join(homeDir, '.twin')` → `join(homeDir, '.twincode')` — single source of truth for config home |
| `src/utils/env.ts` | `.twin${suffix}.json` → `.twincode${suffix}.json` — OAuth token file path |

---

## Project Instruction File

| File | Change |
|------|--------|
| `src/utils/projectInstructions.ts` | `PRIMARY_PROJECT_INSTRUCTION_FILE = 'TWIN.md'` → `'TWINCODE.md'` |
| `src/utils/config.ts` | `join(configHomeDir, 'TWIN.md')` → `'TWINCODE.md'` — user memory path |
| `src/utils/claudemd.ts` | `.twin/CLAUDE.md` → `.twincode/CLAUDE.md`; `.twin/rules` → `.twincode/rules`; doc comments |
| `src/components/memory/MemoryFileSelector.tsx` | `join(configHomeDir, "TWIN.md")` → `"TWINCODE.md"`; description string |
| `src/commands/init-call.tsx` | All `TWIN.md` → `TWINCODE.md`; template header; description strings |
| `src/commands/twinit/twinit.tsx` | All `TWIN.md` → `TWINCODE.md`; prompt strings |

---

## Project Settings Path

| File | Change |
|------|--------|
| `src/utils/settings/settings.ts` | `'.twin/settings.json'` → `'.twincode/settings.json'` |
| `src/services/settingsSync/types.ts` | `~/.twin/settings.json` → `~/.twincode/settings.json`; `~/.twin/TWIN.md` → `~/.twincode/TWINCODE.md`; project paths |

---

## Binary / CLI Name

| File | Change |
|------|--------|
| `src/main.tsx` | `program.name('twin')` → `'twincode'`; description string; version string `(twin)` → `(twincode)`; plugin help text |
| `src/entrypoints/cli.tsx` | Version fast-path: `(twin)` → `(twincode)` |
| `src/utils/doctorDiagnostic.ts` | `getCliBinaryName()` fallback `'twin'` → `'twincode'`; `~/.twin/local/` → `~/.twincode/local/` |
| `src/utils/localInstaller.ts` | `.bin/twin` → `.bin/twincode`; `/.twin/local/` → `/.twincode/local/`; `getLocalClaudePath()` return; `twin-local` → `twincode-local`; wrapper script |
| `src/setup.ts` | Error message `twin requires` → `twincode requires` |

---

## Permission Patterns

| File | Change |
|------|--------|
| `src/tools/FileEditTool/constants.ts` | `GLOBAL_CLAUDE_FOLDER_PERMISSION_PATTERN = '~/.twin/**'` → `'~/.twincode/**'` |
| `src/commands/statusline.tsx` | `Edit(~/.twin/settings.json)` → `Edit(~/.twincode/settings.json)`; description |
| `src/commands/key/key.tsx` | `SETTINGS_PATH = join(homedir(), '.twin', ...)` → `'.twincode'` |
| `src/commands/twin-logout/twin-logout.tsx` | `SETTINGS_PATH` `.twin` → `.twincode` |
| `src/commands/twin-switch/twin-switch.tsx` | `SETTINGS_PATH` `.twin` → `.twincode` |

---

## UI Display Strings

| File | Change |
|------|--------|
| `src/components/StartupScreen.ts` | Prompt border title `twin` → `twincode` |
| `src/components/LogoV2/LogoV2.tsx` | Border title `"twin"` → `"twincode"` (both full and compact) |
| `src/components/agents/types.ts` | `FOLDER_NAME: '.twin'` → `'.twincode'` |
| `src/components/agents/new-agent-creation/wizard-steps/LocationStep.tsx` | Labels `Project (.twin/agents/)` → `.twincode`; `Personal (~/.twin/agents/)` → `~/.twincode` |
| `src/components/agents/new-agent-creation/wizard-steps/MemoryStep.tsx` | All memory scope labels `~/.twin/` → `~/.twincode/`; `.twin/agent-memory` → `.twincode/agent-memory` |
| `src/components/hooks/SelectEventMode.tsx` | Policy restriction message `~/.twin/settings.json` → `~/.twincode` |
| `src/components/permissions/rules/AddPermissionRules.tsx` | Description `Saved in ~/.twin/settings.json` → `~/.twincode` |
| `src/components/skills/SkillsMenu.tsx` | Empty state `.twin/skills/` → `.twincode/skills/` |
| `src/components/AutoUpdater.tsx` | Error message `~/.twin/local` → `~/.twincode/local`; `twin doctor` → `twincode doctor` |
| `src/screens/Doctor.tsx` | `projectAgentsDir` `.twin/agents` → `.twincode/agents`; onDone string |
| `src/screens/REPL.tsx` | Terminal title fallback `'twin'` → `'twincode'`; worktree tip `.twin/settings.json` → `.twincode`; suspend message |
| `src/commands/doctor/doctor.tsx` | Heading `twin doctor` → `twincode doctor` |
| `src/commands/install.tsx` | All install display strings; `.local/bin/twin` → `twincode` |

---

## Obsidian Vault Paths

| File | Change |
|------|--------|
| `src/constants/prompts.ts` | `join(vault, 'twin', ...)` → `join(vault, 'twincode', ...)` for README, sessions, brain paths; config dir description |
| `src/commands/save/save.tsx` | Session path `vault/twin/` → `vault/twincode/` |
| `src/commands/load/load.tsx` | README + session paths `vault/twin/` → `vault/twincode/` |
| `mcp/twin-memory.py` *(sibling repo)* | `_project_dir()` `VAULT_PATH / "twin"` → `"twincode"`; legacy migration paths; doc comments |

---

## CLI Help & Error Messages

| File | Change |
|------|--------|
| `src/cli/handlers/auth.ts` | `Run twin auth login` → `twincode auth login` |
| `src/cli/handlers/mcp.tsx` | `twin mcp remove` / `Use \`twin mcp add\`` → `twincode` |
| `src/cli/handlers/plugins.ts` | `Use \`twin plugin install\`` → `twincode` |
| `src/cli/update.ts` | `twin is up to date` → `twincode`; `~/.twin/local` → `~/.twincode/local`; `twin doctor` → `twincode doctor`; `twin install` → `twincode install` |
| `src/commands/mcp/addCommand.ts` | All `twin mcp add` examples → `twincode`; description |
| `src/commands/plugin/ManagePlugins.tsx` | `.twin/settings.*` → `.twincode/settings.*` in UI strings |
| `src/commands/sandbox-toggle/sandbox-toggle.tsx` | Fallback path `.twin/settings.local.json` → `.twincode` |
| `src/commands/onboard-github/onboard-github.tsx` | Error message `~/.twin/settings.json` → `~/.twincode` |
| `src/commands/createMovedToPluginCommand.ts` | `twin plugin install` → `twincode plugin install` |
| `src/commands/session/session.tsx` | `twin --remote` → `twincode --remote` |
| `src/commands.ts` | Insights description `twin sessions` → `twincode sessions` |
| `src/commands/model/index.ts` | Description `for twin` → `for twincode` |
| `src/commands/review.ts` | Description `Runs in twin` → `twincode` |
| `src/commands/buddy/index.ts` | Description `twin companion` → `twincode companion` |
| `src/services/plugins/pluginOperations.ts` | Error message `.twin/settings.json` + `twin plugin disable` → `twincode` |

---

## Skills / Tips

| File | Change |
|------|--------|
| `src/skills/bundled/updateConfig.ts` | All `~/.twin/settings.json`, `.twin/settings.json`, `.twin/settings.local.json`, `~/.twin/bash-log.txt` → `twincode` |
| `src/skills/bundled/keybindings.ts` | All `~/.twin/keybindings.json` → `~/.twincode/keybindings.json` |
| `src/skills/bundled/loop.ts` | `~/.twin/loop.md` → `~/.twincode/loop.md` |
| `src/services/tips/tipRegistry.ts` | Skills tip `.twin/skills/` + `~/.twin/skills/` → `twincode` |

---

## Internals / Telemetry / MCP Client

| File | Change |
|------|--------|
| `src/services/mcp/client.ts` | MCP client info `title: 'twin'`, `description: 'twin —'` → `twincode` |
| `src/services/notifier.ts` | `DEFAULT_TITLE = 'twin'` → `'twincode'` |
| `src/services/api/codexShim.ts` | `headers.originator = 'twin'` → `'twincode'` |
| `src/services/api/codexUsage.ts` | `originator: 'twin'` → `'twincode'` |
| `src/commands/cache-probe/cache-probe.ts` | `originator: 'twin'` → `'twincode'` |
| `src/cost-tracker.ts` | `tag: 'twin.tokenUsage'` → `'twincode.tokenUsage'` |
| `src/bridge/trustedDevice.ts` | Device display name `twin on ${host}` → `twincode on ${host}` |
| `src/bridge/sessionRunner.ts` | Debug log path `tmpdir()/twin/` → `tmpdir()/twincode/` |
| `src/bridge/bridgeMain.ts` | Debug glob `tmpdir()/twin/` → `tmpdir()/twincode/` |
| `src/bridge/inboundAttachments.ts` | Comment `~/.twin/uploads/` → `~/.twincode/uploads/` |
| `src/commands/copy/copy.tsx` | `COPY_DIR = tmpdir()/twin` → `tmpdir()/twincode` |
| `src/commands/insights.ts` | All prompt strings `twin session` / `twin usage` → `twincode` |

---

## Migration Logic (in `bin/twincode`)

```js
// Auto-migrate ~/.twin → ~/.twincode and ~/.twin.json → ~/.twincode.json
const OLD_TWIN_DIR = join(homedir(), '.twin')
const OLD_TWIN_JSON = join(homedir(), '.twin.json')
if (existsSync(OLD_TWIN_DIR) && !existsSync(TWIN_DIR)) {
  try { renameSync(OLD_TWIN_DIR, TWIN_DIR) } catch {}
}
if (existsSync(OLD_TWIN_JSON) && !existsSync(TWIN_JSON_PATH)) {
  try { renameSync(OLD_TWIN_JSON, TWIN_JSON_PATH) } catch {}
}
```

Runs on every startup before anything else touches the config dir.

---

## Not Changed (intentional)

| Thing | Reason |
|-------|--------|
| `mcp__twin-memory__*` permission strings | MCP server name is a stable external interface; users have these in their `settings.json` already |
| Slash command names `/twin-logout`, `/twin-switch` | Internal command identifiers, no user-visible impact |
| `CLAUDE_CONFIG_DIR` env var | Upstream compatibility env var name |
