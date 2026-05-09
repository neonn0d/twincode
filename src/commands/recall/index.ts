import type { Command } from '../../commands.js'

const recall: Command = {
  type: 'local-jsx',
  name: 'recall',
  description: 'Search past sessions in Obsidian vault — /recall <query>',
  isEnabled: () => true,
  load: () => import('./recall.js'),
}

export default recall
