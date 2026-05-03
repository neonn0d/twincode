import type { Command } from '../../commands.js'

export default {
  type: 'local-jsx',
  name: 'key',
  description: 'Change your DeepSeek API key',
  isEnabled: () => true,
  load: () => import('./key.js'),
} satisfies Command
