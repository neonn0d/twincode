import type { Command } from '../../commands.js'

export default {
  type: 'local-jsx',
  name: 'logout',
  description: 'Remove your DeepSeek API key',
  isEnabled: () => true,
  load: () => import('./twin-logout.js'),
} satisfies Command
