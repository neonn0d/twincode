import type { Command } from '../../commands.js'

const twinit: Command = {
  type: 'local-jsx',
  name: 'twinit',
  description: 'Scan this project and build the twin brain in Obsidian — run once on new projects',
  isEnabled: () => true,
  load: () => import('./twinit.js'),
}

export default twinit
