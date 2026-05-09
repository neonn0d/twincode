import type { Command } from '../../commands.js'

export default {
  type: 'local-jsx',
  name: 'switch',
  description: 'Switch twin to a different AI provider',
  isEnabled: () => true,
  load: () => import('./twin-switch.js'),
} satisfies Command
