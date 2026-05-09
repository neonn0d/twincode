import { APIUserAbortError } from '@anthropic-ai/sdk'
import { mkdirSync, writeFileSync } from 'fs'
import { homedir } from 'os'
import { join } from 'path'
import { clearSkillCaches } from '../../skills/loadSkillsDir.js'
import * as React from 'react'
import { useCallback, useRef, useState } from 'react'
import { generateSkill } from '../../components/skills/generateSkill.js'
import { Spinner } from '../../components/Spinner.js'
import { useMainLoopModel } from '../../hooks/useMainLoopModel.js'
import { Box, Text, useInput } from '../../ink.js'
import { useKeybinding } from '../../keybindings/useKeybinding.js'
import type { LocalJSXCommandOnDone } from '../../types/command.js'
import { createAbortController } from '../../utils/abortController.js'
import { getCwd } from '../../utils/cwd.js'
import TextInput from '../../components/TextInput.js'
import { Byline } from '../../components/design-system/Byline.js'
import { ConfigurableShortcutHint } from '../../components/ConfigurableShortcutHint.js'
import { Dialog } from '../../components/design-system/Dialog.js'

type Step = 'describe' | 'scope' | 'generating' | 'done'
type Scope = 'project' | 'global'

export function SkillNewForm({ onDone }: { onDone: LocalJSXCommandOnDone }) {
  const [step, setStep] = useState<Step>('describe')
  const [prompt, setPrompt] = useState('')
  const [scope, setScope] = useState<Scope>('project')
  const [cursorOffset, setCursorOffset] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const model = useMainLoopModel()

  const handleCancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
    onDone('Cancelled.')
  }, [onDone])

  useKeybinding('confirm:no', handleCancel, { context: 'Settings', isActive: step !== 'generating' })

  const handleCancelGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
    setError('Generation cancelled')
    setStep('describe')
  }, [])

  useKeybinding('confirm:no', handleCancelGeneration, { context: 'Settings', isActive: step === 'generating' })

  // Scope step keyboard
  useInput((input, key) => {
    if (step !== 'scope') return
    if (key.upArrow || input === 'k') setScope('project')
    if (key.downArrow || input === 'j') setScope('global')
    if (key.return) startGeneration()
  }, { isActive: step === 'scope' })

  const handleDescribeSubmit = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed) { setError('Please describe what the skill should do'); return }
    setError(null)
    setStep('scope')
  }

  const startGeneration = async () => {
    setError(null)
    setStep('generating')

    const dir = scope === 'global'
      ? join(homedir(), '.twincode', 'skills')
      : join(getCwd(), '.twincode', 'skills')

    const controller = createAbortController()
    abortControllerRef.current = controller

    try {
      const skill = await generateSkill(prompt.trim(), model, controller.signal)
      const skillDir = join(dir, skill.name)
      const filePath = join(skillDir, 'SKILL.md')

      mkdirSync(skillDir, { recursive: true })
      writeFileSync(filePath, [
        '---',
        `name: ${skill.name}`,
        `description: ${skill.description}`,
        '---',
        '',
        skill.content,
      ].join('\n'), 'utf8')

      clearSkillCaches()
      onDone(`Created skill "${skill.name}" at ${filePath}`)
    } catch (err) {
      if (err instanceof APIUserAbortError) return
      setError(err instanceof Error ? err.message : 'Failed to generate skill')
      setStep('describe')
    } finally {
      abortControllerRef.current = null
    }
  }

  const footer = (
    <Byline>
      <ConfigurableShortcutHint action="confirm:yes" context="Confirmation" fallback="Enter" description="continue" />
      <ConfigurableShortcutHint action="confirm:no" context="Settings" fallback="Esc" description="cancel" />
    </Byline>
  )

  if (step === 'generating') {
    return (
      <Dialog title="New Skill" onCancel={handleCancelGeneration} hideInputGuide>
        <Box flexDirection="row" alignItems="center" gap={1}>
          <Spinner />
          <Text color="suggestion">Generating skill…</Text>
        </Box>
        <Box marginTop={1}>
          <Text dimColor italic>
            <ConfigurableShortcutHint action="confirm:no" context="Settings" fallback="Esc" description="cancel" />
          </Text>
        </Box>
      </Dialog>
    )
  }

  if (step === 'scope') {
    const scopeOptions: { value: Scope; label: string }[] = [
      { value: 'project', label: `Project  (.twincode/skills/)` },
      { value: 'global', label: `Global   (~/.twincode/skills/)` },
    ]
    return (
      <Dialog title="New Skill" subtitle="Where should this skill be saved?" onCancel={handleCancel} hideInputGuide>
        <Box flexDirection="column">
          {scopeOptions.map(opt => (
            <Text key={opt.value} color={scope === opt.value ? 'blue' : undefined} bold={scope === opt.value}>
              {scope === opt.value ? '› ' : '  '}{opt.label}
            </Text>
          ))}
        </Box>
        <Box marginTop={1}>
          <Text dimColor italic>↑↓ to switch · Enter to generate · Esc to cancel</Text>
        </Box>
      </Dialog>
    )
  }

  // describe step
  return (
    <Dialog title="New Skill" subtitle="What should this skill do?" onCancel={handleCancel} hideInputGuide>
      <Box flexDirection="column">
        {error && <Box marginBottom={1}><Text color="error">{error}</Text></Box>}
        <TextInput
          value={prompt}
          onChange={setPrompt}
          onSubmit={handleDescribeSubmit}
          placeholder="e.g., write React components following our TypeScript patterns…"
          columns={80}
          cursorOffset={cursorOffset}
          onChangeCursorOffset={setCursorOffset}
          focus
          showCursor
        />
      </Box>
      <Box marginTop={1}>{footer}</Box>
    </Dialog>
  )
}

export const call = async (onDone: LocalJSXCommandOnDone): Promise<React.ReactNode> => {
  return <SkillNewForm onDone={onDone} />
}
