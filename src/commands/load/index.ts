import type { Command } from '../../commands.js'

const load: Command = {
  type: 'local-jsx',
  name: 'load',
  description: 'Reload project context from Obsidian vault into the conversation',
  isEnabled: () => true,
  load: () => import('./load.js'),
}

export default load
