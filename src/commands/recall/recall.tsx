import * as os from 'os'
import * as path from 'path'
import * as React from 'react'
import type { LocalJSXCommandCall } from '../../types/command.js'
import { getInitialSettings } from '../../utils/settings/settings.js'

export const call: LocalJSXCommandCall = async (onDone, _context, args) => {
  const query = args?.trim()
  if (!query) {
    onDone('Usage: /recall <query>  — search past sessions for a keyword or topic', { display: 'system' })
    return null
  }

  const settings = getInitialSettings() as Record<string, unknown>
  const vault = settings.obsidianVault as string | undefined
  if (!vault) {
    onDone('No Obsidian vault configured.', { display: 'system' })
    return null
  }

  const cwd = process.cwd()
  const rel = path.relative(os.homedir(), cwd)
  const sessionsFolder = `twin/${rel}/sessions`

  onDone(`Searching sessions for "${query}"…`, {
    display: 'system',
    shouldQuery: true,
    metaMessages: [
      `Search the Obsidian vault for past session notes matching the query.

Call search_notes from the twin-memory MCP with query="${query}".

Then filter the results to only show matches inside the folder \`${sessionsFolder}\`. For each matching note, show:
- The note filename (date)
- The matching lines with context

Present the results clearly so the user can see what was done on those past sessions. If no matches, say so.`,
    ],
  })
  return null
}
