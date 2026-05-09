import { existsSync, readFileSync } from 'fs'
import * as os from 'os'
import * as path from 'path'
import * as React from 'react'
import type { LocalJSXCommandCall } from '../../types/command.js'
import { getInitialSettings } from '../../utils/settings/settings.js'

export const call: LocalJSXCommandCall = async (onDone) => {
  const settings = getInitialSettings() as Record<string, unknown>
  const vault = settings.obsidianVault as string | undefined

  if (!vault) {
    onDone('No Obsidian vault configured. Set one up via /memory.', { display: 'system' })
    return null
  }

  const cwd = process.cwd()
  const rel = path.relative(os.homedir(), cwd)
  const today = new Date().toISOString().slice(0, 10)

  const readmePath = path.join(vault, 'twincode', rel, 'README.md')
  const sessionPath = path.join(vault, 'twincode', rel, 'sessions', `${today}.md`)

  const parts: string[] = []

  if (existsSync(readmePath)) {
    try {
      const content = readFileSync(readmePath, 'utf8').trim()
      if (content) parts.push(`## Project memory\n\n${content}`)
    } catch {}
  }

  if (existsSync(sessionPath)) {
    try {
      const content = readFileSync(sessionPath, 'utf8').trim()
      if (content) parts.push(`## Today's sessions (${today})\n\n${content}`)
    } catch {}
  }

  if (parts.length === 0) {
    onDone(`No vault notes found for this project yet. Use /save to create them.`, { display: 'system' })
    return null
  }

  onDone('Context loaded from Obsidian.', {
    display: 'system',
    metaMessages: [
      `Project context reloaded from Obsidian vault:\n\n${parts.join('\n\n')}`,
    ],
  })
  return null
}
