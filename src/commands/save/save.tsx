import { existsSync, readFileSync } from 'fs'
import * as os from 'os'
import * as path from 'path'
import * as React from 'react'
import type { LocalJSXCommandCall } from '../../types/command.js'
import { getInitialSettings } from '../../utils/settings/settings.js'

export const call: LocalJSXCommandCall = async (onDone) => {
  const cwd = process.cwd()
  const rel = path.relative(os.homedir(), cwd)
  const today = new Date().toISOString().slice(0, 10)
  const readmeNote = `twincode/${rel}/README`

  // Read today's session file so the AI has full-day context when writing
  const settings = getInitialSettings() as Record<string, unknown>
  const vault = settings.obsidianVault as string | undefined
  let todayContext = ''
  if (vault) {
    const sessionPath = path.join(vault, 'twincode', rel, 'sessions', `${today}.md`)
    if (existsSync(sessionPath)) {
      try {
        const content = readFileSync(sessionPath, 'utf8').trim()
        if (content) todayContext = `\n\nToday's session log so far (don't repeat what's already logged, only add the new session block):\n\`\`\`\n${content}\n\`\`\``
      } catch {}
    }
  }

  onDone('Saving to Obsidian…', {
    display: 'system',
    shouldQuery: true,
    metaMessages: [
      `Save this session to Obsidian now. No asking, no skipping.${todayContext}

## Writing rules — no slop

Be a journalist, not a copywriter. Every word must earn its place:
- **title**: 3-6 words, what actually happened. "Fixed auth redirect loop" not "Session working on authentication"
- **summary**: 1-2 sentences max. State what changed and whether it worked. No "we explored" or "we discussed".
- **items**: only files/things actually touched. One tight phrase per item — what changed, not what it is.
- **discoveries**: only real findings — a bug cause, an unexpected constraint, a pattern that wasn't obvious. Skip anything the next person would figure out in 30 seconds. If a brain topic was touched, add "Brain: [[topic]]".
- **warnings**: only genuine gotchas. Skip obvious stuff.
- **next_session**: one concrete action, not a vague direction. Omit if nothing came up.
- **diagram**: only if the flow is genuinely non-obvious and can't be described in a sentence. Most sessions don't need one.

Omit any field that has nothing real to say. A lean accurate log beats a padded complete one.

Call log_session (no cwd needed — it uses the current directory automatically) using those fields.

## README

- set_project_context — only if something genuinely new about the project came up this session
- set_next_steps — only if a concrete next action emerged

## Brain

If something new was discovered (architecture detail, pattern, gotcha, file location), call save_knowledge (no cwd needed). Merge into existing brain note if one exists for that topic. Include "Session: ${today}" in discoveries to track origin. Skip if nothing new.

`,
    ],
  })
  return null
}
