import type { Command } from '../../commands.js'
import { getMainLoopModel } from '../../utils/model/model.js'

const THINK_MODEL = 'deepseek-v4-pro'
const FAST_MODEL = 'deepseek-v4-flash'

function isThinkingModel(model: string): boolean {
  return model.includes('pro') || model.includes('reasoner')
}

export default {
  type: 'local-jsx',
  name: 'think',
  get description() {
    const current = getMainLoopModel()
    return isThinkingModel(current)
      ? `Disable thinking — switch to ${FAST_MODEL}`
      : `Enable thinking — switch to ${THINK_MODEL}`
  },
  immediate: true,
  load: () => import('./think.js'),
} satisfies Command
