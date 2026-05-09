import React, { useEffect, useState } from 'react'
import { Box, Text } from '../../ink.js'
import type { LocalJSXCommandCall } from '../../types/command.js'
import { getMainLoopModel } from '../../utils/model/model.js'
import { pathExists } from '../../utils/file.js'
import { PressEnterToContinue } from '../../components/PressEnterToContinue.js'
import { useAppState } from '../../state/AppState.js'

type Status = 'pending' | 'ok' | 'warn' | 'fail'
type Check = { label: string; status: Status; detail?: string }

function icon(s: Status) {
  return s === 'ok' ? '✓' : s === 'fail' ? '✗' : s === 'warn' ? '!' : '…'
}
function color(s: Status) {
  return s === 'ok' ? 'green' : s === 'fail' ? 'red' : s === 'warn' ? 'yellow' : 'gray'
}

function TwinDoctor({ onDone }: { onDone: () => void }) {
  const mcpTools = useAppState(s => s.mcpTools)
  const [checks, setChecks] = useState<Check[]>([
    { label: 'DeepSeek API', status: 'pending' },
    { label: 'Model', status: 'pending' },
    { label: 'Obsidian vault', status: 'pending' },
    { label: 'MCP servers', status: 'pending' },
  ])
  const [done, setDone] = useState(false)

  useEffect(() => {
    async function run() {
      const results: Check[] = []

      // 1. API reachability
      try {
        const base = (process.env.OPENAI_BASE_URL ?? 'https://api.deepseek.com/v1').replace(/\/$/, '')
        const key = process.env.OPENAI_API_KEY ?? ''
        const res = await fetch(`${base}/models`, {
          headers: { Authorization: `Bearer ${key}` },
          signal: AbortSignal.timeout(5000),
        })
        if (res.ok) {
          const data = (await res.json()) as { data?: { id: string }[] }
          const models = data.data?.map(m => m.id).join(', ') ?? 'reachable'
          results.push({ label: 'DeepSeek API', status: 'ok', detail: models })
        } else {
          results.push({ label: 'DeepSeek API', status: 'fail', detail: `HTTP ${res.status}` })
        }
      } catch (e) {
        results.push({ label: 'DeepSeek API', status: 'fail', detail: String(e) })
      }

      // 2. Model
      const model = getMainLoopModel()
      const isReasoning = model.includes('pro') || model.includes('reasoner')
      results.push({
        label: 'Model',
        status: 'ok',
        detail: `${model}${isReasoning ? '  (reasoning on)' : '  (use /think to enable)'}`,
      })

      // 3. Obsidian vault
      const vault = process.env.OBSIDIAN_VAULT
      if (!vault) {
        results.push({ label: 'Obsidian vault', status: 'warn', detail: 'OBSIDIAN_VAULT not set — compact notes disabled' })
      } else if (await pathExists(vault)) {
        results.push({ label: 'Obsidian vault', status: 'ok', detail: vault })
      } else {
        results.push({ label: 'Obsidian vault', status: 'fail', detail: `path not found: ${vault}` })
      }

      // 4. MCP servers
      const toolCount = (mcpTools ?? []).length
      if (toolCount > 0) {
        results.push({ label: 'MCP servers', status: 'ok', detail: `${toolCount} tools loaded` })
      } else {
        results.push({ label: 'MCP servers', status: 'warn', detail: 'no MCP tools loaded' })
      }

      setChecks(results)
      setDone(true)
    }
    void run()
  }, [mcpTools])

  return (
    <Box flexDirection="column" paddingX={1} paddingY={1}>
      <Text bold>twincode doctor</Text>
      <Box flexDirection="column" marginTop={1}>
        {checks.map(c => (
          <Box key={c.label}>
            <Text color={color(c.status)}>{icon(c.status)} </Text>
            <Text bold>{c.label.padEnd(18)}</Text>
            {c.detail ? <Text dimColor>{c.detail}</Text> : null}
          </Box>
        ))}
      </Box>
      {done && (
        <Box marginTop={1}>
          <PressEnterToContinue onPress={onDone} />
        </Box>
      )}
    </Box>
  )
}

export const call: LocalJSXCommandCall = onDone => {
  return Promise.resolve(<TwinDoctor onDone={() => onDone()} />)
}
