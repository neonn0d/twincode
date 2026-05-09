import * as React from 'react'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'
import { Box, Text, useInput } from '../../ink.js'
import type { LocalJSXCommandContext } from '../../commands.js'
import type { LocalJSXCommandOnDone } from '../../types/command.js'
import { gracefulShutdownSync } from '../../utils/gracefulShutdown.js'

const SETTINGS_PATH = join(homedir(), '.twincode', 'settings.json')

const PROVIDERS = [
  { id: 'deepseek', label: 'DeepSeek', hint: 'Best for coding · ~$2/mo', url: 'platform.deepseek.com' },
  { id: 'custom', label: 'Custom', hint: 'Any OpenAI-compatible API', url: '' },
]

const DEEPSEEK_MODELS = [
  { id: 'deepseek-v4-pro', label: 'deepseek-v4-pro', hint: 'Most capable' },
  { id: 'deepseek-v4-flash', label: 'deepseek-v4-flash', hint: 'Fast' },
  { id: 'deepseek-chat', label: 'deepseek-chat', hint: 'Cheap' },
  { id: 'deepseek-reasoner', label: 'deepseek-reasoner', hint: 'Thinks' },
]

type Step = 'provider' | 'model' | 'apikey' | 'custom-url' | 'custom-model' | 'custom-key' | 'done' | 'error'

function SwitchUI({ onDone }: { onDone: (msg: string) => void }) {
  const [step, setStep] = React.useState<Step>('provider')
  const [providerIdx, setProviderIdx] = React.useState(0)
  const [modelIdx, setModelIdx] = React.useState(0)
  const [apiKeyInput, setApiKeyInput] = React.useState('')
  const [customUrl, setCustomUrl] = React.useState('')
  const [customModel, setCustomModel] = React.useState('')
  const [customKey, setCustomKey] = React.useState('')
  const [inputBuf, setInputBuf] = React.useState('')
  const [error, setError] = React.useState('')
  const [savedModel, setSavedModel] = React.useState('')

  const provider = PROVIDERS[providerIdx].id

  useInput((input, key) => {
    if (step === 'provider') {
      if (key.upArrow) setProviderIdx(i => Math.max(0, i - 1))
      else if (key.downArrow) setProviderIdx(i => Math.min(PROVIDERS.length - 1, i + 1))
      else if (key.return) {
        if (PROVIDERS[providerIdx].id === 'custom') setStep('custom-url')
        else setStep('model')
      }
    } else if (step === 'model') {
      if (key.upArrow) setModelIdx(i => Math.max(0, i - 1))
      else if (key.downArrow) setModelIdx(i => Math.min(DEEPSEEK_MODELS.length - 1, i + 1))
      else if (key.return) setStep('apikey')
    } else if (step === 'apikey') {
      if (key.return) {
        const trimmed = apiKeyInput.trim()
        if (!trimmed.startsWith('sk-')) { setError('DeepSeek keys start with sk-'); return }
        setError('')
        saveDeepSeek(DEEPSEEK_MODELS[modelIdx].id, trimmed)
      } else if (key.backspace || key.delete) {
        setApiKeyInput(s => s.slice(0, -1))
      } else if (input && !key.ctrl && !key.meta) {
        setApiKeyInput(s => s + input)
      }
    } else if (step === 'custom-url') {
      if (key.return) {
        const trimmed = inputBuf.trim()
        if (!trimmed) { setError('Base URL required'); return }
        setError('')
        setCustomUrl(trimmed)
        setInputBuf('')
        setStep('custom-model')
      } else if (key.backspace || key.delete) {
        setInputBuf(s => s.slice(0, -1))
      } else if (input && !key.ctrl && !key.meta) {
        setInputBuf(s => s + input)
      }
    } else if (step === 'custom-model') {
      if (key.return) {
        const trimmed = inputBuf.trim()
        if (!trimmed) { setError('Model name required'); return }
        setError('')
        setCustomModel(trimmed)
        setInputBuf('')
        setStep('custom-key')
      } else if (key.backspace || key.delete) {
        setInputBuf(s => s.slice(0, -1))
      } else if (input && !key.ctrl && !key.meta) {
        setInputBuf(s => s + input)
      }
    } else if (step === 'custom-key') {
      if (key.return) {
        const trimmed = inputBuf.trim()
        setError('')
        setCustomKey(trimmed)
        saveCustom(customUrl, customModel, trimmed)
      } else if (key.backspace || key.delete) {
        setInputBuf(s => s.slice(0, -1))
      } else if (input && !key.ctrl && !key.meta) {
        setInputBuf(s => s + input)
      }
    }
  })

  function saveDeepSeek(model: string, key: string) {
    try {
      let config: Record<string, unknown> = {}
      if (existsSync(SETTINGS_PATH)) config = JSON.parse(readFileSync(SETTINGS_PATH, 'utf8'))
      config.model = model
      config.env = {
        ...(config.env as object ?? {}),
        OPENAI_API_KEY: key,
        OPENAI_BASE_URL: 'https://api.deepseek.com/v1',
        OPENAI_MODEL: model,
      }
      writeFileSync(SETTINGS_PATH, JSON.stringify(config, null, 2))
      setSavedModel(model)
      setStep('done')
      onDone(`Switched to DeepSeek (${model}). Restart twin to apply.`)
      setTimeout(() => gracefulShutdownSync(0, 'switch'), 400)
    } catch (e) {
      setError(String(e))
      setStep('error')
    }
  }

  function saveCustom(baseUrl: string, model: string, key: string) {
    try {
      let config: Record<string, unknown> = {}
      if (existsSync(SETTINGS_PATH)) config = JSON.parse(readFileSync(SETTINGS_PATH, 'utf8'))
      config.model = model
      config.env = {
        ...(config.env as object ?? {}),
        OPENAI_API_KEY: key || 'none',
        OPENAI_BASE_URL: baseUrl,
        OPENAI_MODEL: model,
      }
      writeFileSync(SETTINGS_PATH, JSON.stringify(config, null, 2))
      setSavedModel(model)
      setStep('done')
      onDone(`Switched to custom (${model}). Restart twin to apply.`)
      setTimeout(() => gracefulShutdownSync(0, 'switch'), 400)
    } catch (e) {
      setError(String(e))
      setStep('error')
    }
  }

  if (step === 'done') {
    return (
      <Box flexDirection="column" paddingTop={1}>
        <Text color="green">✔ Switched to {savedModel}</Text>
        <Text dimColor>Restarting twin…</Text>
      </Box>
    )
  }

  if (step === 'error') {
    return (
      <Box flexDirection="column" paddingTop={1}>
        <Text color="red">✘ Failed to save settings: {error}</Text>
      </Box>
    )
  }

  return (
    <Box flexDirection="column" paddingTop={1} paddingLeft={2}>
      {step === 'provider' && (
        <>
          <Text bold>Switch provider</Text>
          <Box marginTop={1} flexDirection="column">
            {PROVIDERS.map((p, i) => (
              <Box key={p.id}>
                <Text color={i === providerIdx ? 'cyan' : undefined}>
                  {i === providerIdx ? '› ' : '  '}
                  <Text bold={i === providerIdx}>{p.label}</Text>
                  {'  '}
                  <Text dimColor>{p.hint}</Text>
                </Text>
              </Box>
            ))}
          </Box>
          <Box marginTop={1}>
            <Text dimColor>↑↓ select · Enter confirm</Text>
          </Box>
        </>
      )}

      {step === 'model' && (
        <>
          <Text bold>Choose model</Text>
          <Box marginTop={1} flexDirection="column">
            {DEEPSEEK_MODELS.map((m, i) => (
              <Box key={m.id}>
                <Text color={i === modelIdx ? 'cyan' : undefined}>
                  {i === modelIdx ? '› ' : '  '}
                  <Text bold={i === modelIdx}>{m.label}</Text>
                  {'  '}
                  <Text dimColor>{m.hint}</Text>
                </Text>
              </Box>
            ))}
          </Box>
          <Box marginTop={1}>
            <Text dimColor>↑↓ select · Enter confirm</Text>
          </Box>
        </>
      )}

      {step === 'apikey' && (
        <>
          <Text bold>DeepSeek API key</Text>
          <Text dimColor>Get yours at: platform.deepseek.com</Text>
          <Box marginTop={1}>
            <Text>› </Text>
            <Text>{'●'.repeat(apiKeyInput.length)}</Text>
            <Text color="cyan">█</Text>
          </Box>
          {error && <Box marginTop={1}><Text color="red">{error}</Text></Box>}
          <Box marginTop={1}><Text dimColor>Enter to confirm</Text></Box>
        </>
      )}

      {step === 'custom-url' && (
        <>
          <Text bold>Custom provider — Base URL</Text>
          <Text dimColor>e.g. https://api.together.xyz/v1 · https://openrouter.ai/api/v1 · http://localhost:11434/v1</Text>
          <Box marginTop={1}>
            <Text>› </Text>
            <Text>{inputBuf}</Text>
            <Text color="cyan">█</Text>
          </Box>
          {error && <Box marginTop={1}><Text color="red">{error}</Text></Box>}
          <Box marginTop={1}><Text dimColor>Enter to confirm</Text></Box>
        </>
      )}

      {step === 'custom-model' && (
        <>
          <Text bold>Custom provider — Model name</Text>
          <Text dimColor>e.g. meta-llama/Llama-3.3-70B-Instruct · mistralai/Mixtral-8x7B</Text>
          <Box marginTop={1}>
            <Text>› </Text>
            <Text>{inputBuf}</Text>
            <Text color="cyan">█</Text>
          </Box>
          {error && <Box marginTop={1}><Text color="red">{error}</Text></Box>}
          <Box marginTop={1}><Text dimColor>Enter to confirm</Text></Box>
        </>
      )}

      {step === 'custom-key' && (
        <>
          <Text bold>Custom provider — API key</Text>
          <Text dimColor>Leave blank for local models (Ollama etc.)</Text>
          <Box marginTop={1}>
            <Text>› </Text>
            <Text>{'●'.repeat(inputBuf.length)}</Text>
            <Text color="cyan">█</Text>
          </Box>
          {error && <Box marginTop={1}><Text color="red">{error}</Text></Box>}
          <Box marginTop={1}><Text dimColor>Enter to confirm</Text></Box>
        </>
      )}
    </Box>
  )
}

export async function call(
  onDone: LocalJSXCommandOnDone,
  _context: LocalJSXCommandContext,
): Promise<React.ReactNode> {
  return <SwitchUI onDone={onDone} />
}
