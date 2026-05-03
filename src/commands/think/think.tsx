import React, { useEffect } from 'react'
import { useAppState, useSetAppState } from '../../state/AppState.js'
import type { LocalJSXCommandCall } from '../../types/command.js'

const THINK_MODEL = 'deepseek-v4-pro'
const FAST_MODEL = 'deepseek-v4-flash'

function isThinkingModel(model: string): boolean {
  return model.includes('pro') || model.includes('reasoner')
}

function ThinkToggle({ onDone }: { onDone: (msg: string, opts?: { display?: string }) => void }) {
  const setAppState = useSetAppState()
  const currentModel = useAppState(s => s.mainLoopModel)

  useEffect(() => {
    const resolved = currentModel ?? process.env.OPENAI_MODEL ?? FAST_MODEL
    const switching = isThinkingModel(resolved)
    const next = switching ? FAST_MODEL : THINK_MODEL
    const label = switching ? `fast (${FAST_MODEL})` : `thinking (${THINK_MODEL})`

    setAppState(prev => ({ ...prev, mainLoopModel: next, mainLoopModelForSession: null }))
    onDone(`Switched to ${label}`, { display: 'system' })
  }, [])

  return null
}

export const call: LocalJSXCommandCall = onDone => {
  return Promise.resolve(<ThinkToggle onDone={onDone} />)
}
