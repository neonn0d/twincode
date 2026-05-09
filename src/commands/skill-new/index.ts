import type { Command } from '../../commands.js'

const skillNew: Command = {
  type: 'local-jsx',
  name: 'skill-new',
  description: 'Create a new skill markdown file',
  isEnabled: () => true,
  load: () => import('./skill-new.js'),
}

export default skillNew
