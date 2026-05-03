import * as React from 'react'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'
import { Text } from '../../ink.js'
import type { LocalJSXCommandContext } from '../../commands.js'
import type { LocalJSXCommandOnDone } from '../../types/command.js'
import { gracefulShutdownSync } from '../../utils/gracefulShutdown.js'

const SETTINGS_PATH = join(homedir(), '.twin', 'settings.json')

export async function call(
  onDone: LocalJSXCommandOnDone,
  _context: LocalJSXCommandContext,
): Promise<React.ReactNode> {
  if (existsSync(SETTINGS_PATH)) {
    try {
      const config = JSON.parse(readFileSync(SETTINGS_PATH, 'utf8'))
      if (config.env) {
        delete config.env.OPENAI_API_KEY
      }
      writeFileSync(SETTINGS_PATH, JSON.stringify(config, null, 2))
    } catch {}
  }

  onDone('Logged out. Restart twin to set a new key.')
  setTimeout(() => gracefulShutdownSync(0, 'logout'), 200)
  return <Text color="green">✔ API key removed. Restart twin to enter a new one.</Text>
}
