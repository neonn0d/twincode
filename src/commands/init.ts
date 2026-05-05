import type { Command } from '../commands.js'
import { isNewInitEnabled } from './initMode.js'

const command: Command = {
  type: 'local-jsx',
  name: 'init',
  get description() {
    return isNewInitEnabled()
      ? 'Initialize new project instruction file(s) and optional skills/hooks with codebase documentation'
      : 'Initialize a new project instruction file with codebase documentation'
  },
  load: () => import('./init-call.js'),
}

export default command
