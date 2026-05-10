import type { Command } from '../../commands.js'

const twinDesigner = {
  type: 'local-jsx',
  name: 'style',
  description: 'Pick a brand style — outputs CSS vars + AI prompt guide to clipboard',
  supportsNonInteractive: false,
  load: () => import('./twin-designer.js'),
} satisfies Command

export default twinDesigner
