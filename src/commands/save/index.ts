import type { Command } from '../../commands.js'

const save: Command = {
  type: 'local-jsx',
  name: 'save',
  description: 'Save session progress to Obsidian memory',
  isEnabled: () => true,
  load: () => import('./save.js'),
}

export default save
