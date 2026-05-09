import * as React from 'react'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'
import { Text } from '../../ink.js'
import type { LocalJSXCommandContext } from '../../commands.js'
import type { LocalJSXCommandOnDone } from '../../types/command.js'

const SETTINGS_PATH = join(homedir(), '.twincode', 'settings.json')

export async function call(
  onDone: LocalJSXCommandOnDone,
  _context: LocalJSXCommandContext,
  args?: string,
): Promise<React.ReactNode> {
  const newKey = (args ?? '').trim()

  if (!newKey) {
    onDone('Usage: /key <your-deepseek-api-key>')
    return <Text>Usage: /key &lt;your-deepseek-api-key&gt;</Text>
  }

  if (!newKey.startsWith('sk-')) {
    onDone('Invalid key — DeepSeek keys start with sk-')
    return <Text color="red">Invalid key — DeepSeek keys start with sk-</Text>
  }

  let config: Record<string, unknown> = {}
  if (existsSync(SETTINGS_PATH)) {
    try {
      config = JSON.parse(readFileSync(SETTINGS_PATH, 'utf8'))
    } catch {}
  }

  if (!config.env || typeof config.env !== 'object') {
    config.env = {}
  }
  ;(config.env as Record<string, string>).OPENAI_API_KEY = newKey

  writeFileSync(SETTINGS_PATH, JSON.stringify(config, null, 2))
  process.env.OPENAI_API_KEY = newKey

  onDone('API key updated. Restart twin for it to take full effect.')
  return <Text color="green">✔ API key updated. Restart twin to apply.</Text>
}
