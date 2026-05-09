import * as React from 'react'
import { useState } from 'react'
import { Box, Text } from '../../ink.js'
import { useKeybinding } from '../../keybindings/useKeybinding.js'
import { useExitOnCtrlCDWithKeybindings } from '../../hooks/useExitOnCtrlCDWithKeybindings.js'
import { getInitialSettings, updateSettingsForSource } from '../../utils/settings/settings.js'
import { ListItem } from '../design-system/ListItem.js'

const MODES = ['auto', 'prompt', 'manual'] as const
type Mode = typeof MODES[number]

type Props = {
  onBack: () => void
}

export function ObsidianSettingsMenu({ onBack }: Props): React.ReactNode {
  const saved = getInitialSettings().obsidianMemory ?? {}
  const [autoLoad, setAutoLoad] = useState(saved.autoLoad ?? true)
  const [autoSave, setAutoSave] = useState(saved.autoSave ?? true)
  const [mode, setMode] = useState<Mode>(saved.mode ?? 'auto')
  const [focused, setFocused] = useState(0)
  const ITEMS = 3

  useExitOnCtrlCDWithKeybindings()

  useKeybinding('select:next', () => setFocused(f => Math.min(f + 1, ITEMS - 1)), { context: 'Select' })
  useKeybinding('select:previous', () => setFocused(f => Math.max(f - 1, 0)), { context: 'Select' })

  useKeybinding('confirm:yes', () => {
    if (focused === 0) {
      const next = !autoLoad
      setAutoLoad(next)
      updateSettingsForSource('userSettings', { obsidianMemory: { autoLoad: next, autoSave, mode } })
    } else if (focused === 1) {
      const next = !autoSave
      setAutoSave(next)
      updateSettingsForSource('userSettings', { obsidianMemory: { autoLoad, autoSave: next, mode } })
    } else if (focused === 2) {
      const nextMode = MODES[(MODES.indexOf(mode) + 1) % MODES.length]
      setMode(nextMode)
      updateSettingsForSource('userSettings', { obsidianMemory: { autoLoad, autoSave, mode: nextMode } })
    }
  }, { context: 'Confirmation' })

  useKeybinding('confirm:no', onBack, { context: 'Confirmation' })

  return (
    <Box flexDirection="column" width="100%">
      <ListItem isFocused={focused === 0}>
        <Text>Auto-load on start: {autoLoad ? 'on' : 'off'}</Text>
      </ListItem>
      <ListItem isFocused={focused === 1}>
        <Text>Auto-save on exit: {autoSave ? 'on' : 'off'}</Text>
      </ListItem>
      <ListItem isFocused={focused === 2}>
        <Text>Mode: {mode}</Text>
        <Text dimColor>  auto / prompt / manual</Text>
      </ListItem>
      <Box marginTop={1}>
        <Text dimColor>↑↓ navigate · Enter to toggle · Esc to go back</Text>
      </Box>
    </Box>
  )
}
