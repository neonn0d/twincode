import { spawnSync } from 'child_process'
import { existsSync } from 'fs'
import { dirname, join } from 'path'
import * as React from 'react'
import { useEffect } from 'react'
import { useStdin } from '../../ink.js'
import type { LocalJSXCommandOnDone } from '../../types/command.js'

function getStylepickPath(): string {
  const root = process.env.LOCALCODE_ROOT ?? join(dirname(process.argv[1] ?? ''), '..')
  return join(root, 'designs', 'cli', 'index.js')
}

function StylePicker({ onDone }: { onDone: LocalJSXCommandOnDone }) {
  const { setRawMode } = useStdin()

  useEffect(() => {
    const pickPath = getStylepickPath()
    if (!existsSync(pickPath)) {
      onDone(`stylepick not found at ${pickPath}`, { display: 'system' })
      return
    }

    setRawMode(false)
    process.stdout.write('\n')
    spawnSync('node', [pickPath], { stdio: 'inherit' })
    process.stdout.write('\n')
    setRawMode(true)

    onDone('Style copied to clipboard — paste it into your project or tell me to apply it')
  }, [])

  return null
}

export async function call(onDone: LocalJSXCommandOnDone): Promise<React.ReactNode> {
  return <StylePicker onDone={onDone} />
}
