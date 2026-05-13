import * as React from 'react'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'
import { Box, Text, useInput } from '../../ink.js'
import type { LocalJSXCommandContext } from '../../commands.js'
import type { LocalJSXCommandOnDone } from '../../types/command.js'

const SETTINGS_PATH = join(homedir(), '.twincode', 'settings.json')

type ProviderType = 'evolink' | 'deepseek' | 'stepfun' | 'openrouter' | 'ollama' | 'custom'

type SavedProvider = {
  apiKey: string
  baseUrl?: string
  model?: string
}

type Settings = {
  savedProviders?: Partial<Record<ProviderType, SavedProvider>>
  activeProvider?: ProviderType
  env?: Record<string, string>
  model?: string
  [key: string]: unknown
}

const PROVIDERS: { id: ProviderType; label: string; hint: string; defaultModel: string; baseUrl: string; noKey?: boolean }[] = [
  { id: 'evolink',    label: 'Evolink',     hint: 'Claude models · Anthropic API',    defaultModel: 'claude-sonnet-4-6',  baseUrl: 'https://direct.evolink.ai' },
  { id: 'deepseek',   label: 'DeepSeek',    hint: 'Best for coding · cheap',           defaultModel: 'deepseek-chat',       baseUrl: 'https://api.deepseek.com/v1' },
  { id: 'stepfun',    label: 'StepFun',     hint: 'step-3.5-flash · fast',             defaultModel: 'step-3.5-flash',      baseUrl: 'https://api.stepfun.ai/step_plan/v1' },
  { id: 'openrouter', label: 'OpenRouter',  hint: '200+ models · one key',             defaultModel: 'openai/gpt-4o-mini',  baseUrl: 'https://openrouter.ai/api/v1' },
  { id: 'ollama',     label: 'Ollama',      hint: 'Local models · no key needed',      defaultModel: 'llama3.2',            baseUrl: 'http://localhost:11434/v1', noKey: true },
  { id: 'custom',     label: 'Custom',      hint: 'Any OpenAI-compatible API',         defaultModel: '',                    baseUrl: '' },
]

function persist(s: Settings) {
  writeFileSync(SETTINGS_PATH, JSON.stringify(s, null, 2))
}

function loadSettings(): Settings {
  try {
    if (!existsSync(SETTINGS_PATH)) return {}
    const s: Settings = JSON.parse(readFileSync(SETTINGS_PATH, 'utf8'))
    // Migrate: if no savedProviders yet, pull active provider from env vars
    if (!s.savedProviders) {
      const env = (s.env ?? {}) as Record<string, string>
      const sp: Partial<Record<ProviderType, SavedProvider>> = {}
      if (env.ANTHROPIC_BASE_URL && env.ANTHROPIC_API_KEY) {
        sp.evolink = { apiKey: env.ANTHROPIC_API_KEY, model: env.ANTHROPIC_MODEL }
        s.activeProvider = 'evolink'
      } else if (env.OPENAI_API_KEY || env.OPENAI_BASE_URL) {
        const isDs = (env.OPENAI_BASE_URL || '').includes('deepseek.com')
        const id: ProviderType = isDs ? 'deepseek' : 'custom'
        sp[id] = { apiKey: env.OPENAI_API_KEY || '', baseUrl: env.OPENAI_BASE_URL, model: env.OPENAI_MODEL }
        s.activeProvider = id
      }
      s.savedProviders = sp
      persist(s)
    }
    return s
  } catch {
    return {}
  }
}

function applyProvider(settings: Settings, id: ProviderType, p: SavedProvider): Settings {
  const s = { ...settings }
  s.activeProvider = id
  const preset = PROVIDERS.find(x => x.id === id)
  const model = p.model || preset?.defaultModel || ''
  s.model = model
  const env = { ...(s.env ?? {}) } as Record<string, string>
  if (id === 'evolink') {
    delete env.OPENAI_BASE_URL; delete env.OPENAI_API_KEY; delete env.OPENAI_MODEL
    delete env.CLAUDE_CODE_USE_OPENAI
    env.ANTHROPIC_BASE_URL = 'https://direct.evolink.ai'
    env.ANTHROPIC_API_KEY = p.apiKey
    env.ANTHROPIC_MODEL = model
  } else {
    delete env.ANTHROPIC_BASE_URL; delete env.ANTHROPIC_API_KEY; delete env.ANTHROPIC_MODEL
    env.OPENAI_BASE_URL = p.baseUrl || preset?.baseUrl || ''
    env.OPENAI_API_KEY = p.apiKey
    env.OPENAI_MODEL = model
    env.CLAUDE_CODE_USE_OPENAI = '1'
  }
  s.env = env
  return s
}

type Screen = 'list' | 'enter-key' | 'custom-url' | 'custom-model'

function SwitchUI({ onDone }: { onDone: (msg: string) => void }) {
  const [settings, setSettings] = React.useState<Settings>(() => loadSettings())
  const [screen, setScreen] = React.useState<Screen>('list')
  const [cursor, setCursor] = React.useState(0)
  const [buf, setBuf] = React.useState('')
  const [customUrl, setCustomUrl] = React.useState('')
  const [customModel, setCustomModel] = React.useState('')
  const [error, setError] = React.useState('')
  const [status, setStatus] = React.useState('')

  const sp = settings.savedProviders ?? {}
  const selectedProvider = PROVIDERS[cursor]

  useInput((input, key) => {
    if (screen === 'list') {
      if (key.upArrow) setCursor(i => Math.max(0, i - 1))
      else if (key.downArrow) setCursor(i => Math.min(PROVIDERS.length - 1, i + 1))
      else if (key.escape) onDone('')
      else if (key.return) {
        const p = selectedProvider
        if (p.id === 'custom' && !sp.custom) {
          setBuf(''); setError(''); setScreen('custom-url')
        } else if (p.noKey && !sp[p.id]) {
          // No key needed (Ollama) — activate directly with empty key
          const saved: SavedProvider = { apiKey: '' }
          const newSp = { ...sp, [p.id]: saved }
          const updated = applyProvider({ ...settings, savedProviders: newSp }, p.id, saved)
          persist(updated)
          setSettings(updated)
          setStatus(`Active: ${p.label}`)
        } else if (!sp[p.id]) {
          setBuf(''); setError(''); setScreen('enter-key')
        } else {
          // Already configured — activate immediately
          const updated = applyProvider(settings, p.id, sp[p.id]!)
          persist(updated)
          setSettings(updated)
          setStatus(`Active: ${p.label}`)
        }
      } else if (input === 'd') {
        const id = selectedProvider.id
        if (sp[id]) {
          const updated = { ...settings, savedProviders: { ...sp } }
          delete updated.savedProviders![id]
          if (updated.activeProvider === id) delete updated.activeProvider
          persist(updated)
          setSettings(updated)
          setStatus(`Removed ${selectedProvider.label} key`)
        }
      }
    } else if (screen === 'custom-url') {
      if (key.return) {
        const v = buf.trim()
        if (!v) { setError('Base URL required'); return }
        setCustomUrl(v); setBuf(''); setError(''); setScreen('custom-model')
      } else if (key.escape) { setScreen('list'); setError('') }
      else type(input, key)
    } else if (screen === 'custom-model') {
      if (key.return) {
        const v = buf.trim()
        if (!v) { setError('Model name required'); return }
        setCustomModel(v); setBuf(''); setError(''); setScreen('enter-key')
      } else if (key.escape) { setScreen('custom-url'); setError('') }
      else type(input, key)
    } else if (screen === 'enter-key') {
      if (key.return) {
        const v = buf.trim()
        const id = selectedProvider.id
        if (!v && id !== 'custom' && !selectedProvider.noKey) { setError('API key required'); return }
        setError('')
        const p: SavedProvider = { apiKey: v }
        if (id === 'custom') { p.baseUrl = customUrl; p.model = customModel }
        const newSp = { ...sp, [id]: p }
        const updated = applyProvider({ ...settings, savedProviders: newSp }, id, p)
        persist(updated)
        setSettings(updated)
        setStatus(`Active: ${selectedProvider.label}`)
        setScreen('list')
      } else if (key.escape) {
        setScreen(selectedProvider.id === 'custom' ? 'custom-model' : 'list')
        setError('')
      } else type(input, key)
    }
  })

  function type(input: string, key: { backspace?: boolean; delete?: boolean; ctrl?: boolean; meta?: boolean }) {
    if (key.backspace || key.delete) setBuf(s => s.slice(0, -1))
    else if (input && !key.ctrl && !key.meta) setBuf(s => s + input)
  }

  // Blank lines to overwrite any leftover terminal content from taller screens
  const pad = <><Text> </Text><Text> </Text><Text> </Text><Text> </Text></>

  if (screen === 'list') {
    return (
      <Box flexDirection="column" paddingTop={1} paddingLeft={2}>
        <Text bold>Providers</Text>
        <Box marginTop={1} flexDirection="column">
          {PROVIDERS.map((p, i) => {
            const configured = !!sp[p.id]
            const isActive = settings.activeProvider === p.id
            const badge = isActive ? ' ✔ active' : configured ? ' configured' : ' no key'
            const badgeColor = isActive ? 'green' : configured ? 'gray' : 'yellow'
            return (
              <Box key={p.id} gap={2}>
                <Text color={i === cursor ? 'cyan' : undefined}>
                  {i === cursor ? '›' : ' '}
                </Text>
                <Text bold={i === cursor} color={i === cursor ? 'cyan' : undefined}>{p.label}</Text>
                <Text color={badgeColor}>{badge}</Text>
                <Text dimColor>{p.hint}</Text>
              </Box>
            )
          })}
        </Box>
        {status && <Box marginTop={1}><Text color="green">✔ {status}</Text></Box>}
        <Box marginTop={1}>
          <Text dimColor>↑↓ navigate · Enter activate · d remove key · Esc close</Text>
        </Box>
      </Box>
    )
  }

  if (screen === 'custom-url') {
    return (
      <Box flexDirection="column" paddingTop={1} paddingLeft={2}>
        <Text bold>Custom — Base URL</Text>
        <Text dimColor>e.g. https://openrouter.ai/api/v1 · http://localhost:11434/v1</Text>
        <Box marginTop={1}><Text>› </Text><Text>{buf}</Text><Text color="cyan">█</Text></Box>
        {error && <Box marginTop={1}><Text color="red">{error}</Text></Box>}
        <Box marginTop={1}><Text dimColor>Enter confirm · Esc back</Text></Box>
        {pad}
      </Box>
    )
  }

  if (screen === 'custom-model') {
    return (
      <Box flexDirection="column" paddingTop={1} paddingLeft={2}>
        <Text bold>Custom — Model name</Text>
        <Text dimColor>e.g. meta-llama/Llama-3.3-70B · mistralai/Mixtral-8x7B</Text>
        <Box marginTop={1}><Text>› </Text><Text>{buf}</Text><Text color="cyan">█</Text></Box>
        {error && <Box marginTop={1}><Text color="red">{error}</Text></Box>}
        <Box marginTop={1}><Text dimColor>Enter confirm · Esc back</Text></Box>
        {pad}
      </Box>
    )
  }

  // enter-key
  const p = selectedProvider
  const keyHint: Record<string, string> = {
    evolink:    'evolink.ai/dashboard/keys',
    deepseek:   'platform.deepseek.com',
    stepfun:    'platform.stepfun.ai',
    openrouter: 'openrouter.ai/keys',
    ollama:     'No key needed — just press Enter',
  }
  return (
    <Box flexDirection="column" paddingTop={1} paddingLeft={2}>
      <Text bold>{p.label} — API key</Text>
      <Text dimColor>{keyHint[p.id] ?? 'Enter your API key'}</Text>
      <Box marginTop={1}><Text>› </Text><Text>{'●'.repeat(buf.length)}</Text><Text color="cyan">█</Text></Box>
      {error && <Box marginTop={1}><Text color="red">{error}</Text></Box>}
      <Box marginTop={1}><Text dimColor>Enter confirm · Esc back</Text></Box>
      {pad}
    </Box>
  )
}

export async function call(
  onDone: LocalJSXCommandOnDone,
  _context: LocalJSXCommandContext,
): Promise<React.ReactNode> {
  return <SwitchUI onDone={onDone} />
}
