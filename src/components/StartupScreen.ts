import { execSync } from 'child_process'
import { getSettings_DEPRECATED } from '../utils/settings/settings.js'
import { LOGO_LINES } from './logoArt.js'

declare const MACRO: { VERSION: string; DISPLAY_VERSION?: string }

const ESC = '\x1b['
const RESET = `${ESC}0m`
const DIM = `${ESC}2m`
const BOLD = `${ESC}1m`
const rgb = (r: number, g: number, b: number) => `${ESC}38;2;${r};${g};${b}m`

function getGitInfo(): { branch: string; dirty: boolean } | null {
  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD', {
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 1000,
    }).toString().trim()
    const dirty = execSync('git status --porcelain', {
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 1000,
    }).toString().trim().length > 0
    return { branch, dirty }
  } catch {
    return null
  }
}

export function detectProvider(modelOverride?: string): { name: string; model: string; baseUrl: string } {
  const settings = getSettings_DEPRECATED() || {}
  const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.deepseek.com/v1'
  const model = modelOverride || process.env.OPENAI_MODEL || (settings as Record<string, unknown>).model as string || 'deepseek-chat'
  const name = baseUrl.includes('deepseek.com') ? 'DeepSeek' : 'OpenAI-compatible'
  return { name, model, baseUrl }
}

export function printStartupScreen(modelOverride?: string): void {
  if (process.env.CI || !process.stdout.isTTY) return

  const p = detectProvider(modelOverride)
  const git = getGitInfo()
  const cwd = process.cwd()
  const home = process.env.HOME || ''
  const displayCwd = home && cwd.startsWith(home) ? `~${cwd.slice(home.length)}` : cwd
  const version = `v${MACRO.DISPLAY_VERSION ?? MACRO.VERSION}`

  const GRAY = rgb(120, 130, 140)
  const BLUE = rgb(100, 180, 255)
  const GREEN = rgb(100, 200, 120)
  const YELLOW = rgb(220, 180, 80)
  const ORANGE = rgb(255, 160, 60)

  const row1 = `${BOLD}${BLUE}twin${RESET} ${DIM}${GRAY}${version}${RESET}  ${GRAY}${p.model}${RESET}`
  let row2 = `${DIM}${GRAY}└─ ${displayCwd}${RESET}`
  if (git) {
    const mark = git.dirty ? `${ORANGE}✦${RESET}` : `${GREEN}✔${RESET}`
    row2 += `  ${DIM}${GRAY}⎇ ${RESET}${YELLOW}${git.branch}${RESET} ${mark}`
  }

  const out: string[] = ['']
  for (const line of LOGO_LINES) out.push(`${BLUE}${line}${RESET}`)
  out.push('')
  out.push(`${DIM}${GRAY}www.twincode.wtf  @neonn0d${RESET}`)
  out.push('')
  out.push(row1)
  out.push(row2)
  out.push('')

  process.stdout.write(out.join('\n') + '\n')
}
