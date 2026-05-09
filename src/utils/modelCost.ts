import type { BetaUsage as Usage } from '@anthropic-ai/sdk/resources/beta/messages/messages.mjs'
import type { AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS } from 'src/services/analytics/index.js'
import { logEvent } from 'src/services/analytics/index.js'
import { setHasUnknownModelCost } from '../bootstrap/state.js'
import { isEnvTruthy } from './envUtils.js'
import { isFastModeEnabled } from './fastMode.js'
import {
  CLAUDE_3_5_HAIKU_CONFIG,
  CLAUDE_3_5_V2_SONNET_CONFIG,
  CLAUDE_3_7_SONNET_CONFIG,
  CLAUDE_HAIKU_4_5_CONFIG,
  CLAUDE_OPUS_4_1_CONFIG,
  CLAUDE_OPUS_4_5_CONFIG,
  CLAUDE_OPUS_4_6_CONFIG,
  CLAUDE_OPUS_4_7_CONFIG,
  CLAUDE_OPUS_4_CONFIG,
  CLAUDE_SONNET_4_5_CONFIG,
  CLAUDE_SONNET_4_6_CONFIG,
  CLAUDE_SONNET_4_CONFIG,
} from './model/configs.js'
import {
  firstPartyNameToCanonical,
  getCanonicalName,
  getDefaultMainLoopModelSetting,
  type ModelShortName,
} from './model/model.js'

// @see https://platform.claude.com/docs/en/about-claude/pricing
export type ModelCosts = {
  inputTokens: number
  outputTokens: number
  promptCacheWriteTokens: number
  promptCacheReadTokens: number
  webSearchRequests: number
}

// Standard pricing tier for Sonnet models: $3 input / $15 output per Mtok
export const COST_TIER_3_15 = {
  inputTokens: 3,
  outputTokens: 15,
  promptCacheWriteTokens: 3.75,
  promptCacheReadTokens: 0.3,
  webSearchRequests: 0.01,
} as const satisfies ModelCosts

// Pricing tier for Opus 4/4.1: $15 input / $75 output per Mtok
export const COST_TIER_15_75 = {
  inputTokens: 15,
  outputTokens: 75,
  promptCacheWriteTokens: 18.75,
  promptCacheReadTokens: 1.5,
  webSearchRequests: 0.01,
} as const satisfies ModelCosts

// Pricing tier for Opus 4.5: $5 input / $25 output per Mtok
export const COST_TIER_5_25 = {
  inputTokens: 5,
  outputTokens: 25,
  promptCacheWriteTokens: 6.25,
  promptCacheReadTokens: 0.5,
  webSearchRequests: 0.01,
} as const satisfies ModelCosts

// Fast mode pricing for Opus 4.6: $30 input / $150 output per Mtok
export const COST_TIER_30_150 = {
  inputTokens: 30,
  outputTokens: 150,
  promptCacheWriteTokens: 37.5,
  promptCacheReadTokens: 3,
  webSearchRequests: 0.01,
} as const satisfies ModelCosts

// Pricing for Haiku 3.5: $0.80 input / $4 output per Mtok
export const COST_HAIKU_35 = {
  inputTokens: 0.8,
  outputTokens: 4,
  promptCacheWriteTokens: 1,
  promptCacheReadTokens: 0.08,
  webSearchRequests: 0.01,
} as const satisfies ModelCosts

// Pricing for Haiku 4.5: $1 input / $5 output per Mtok
export const COST_HAIKU_45 = {
  inputTokens: 1,
  outputTokens: 5,
  promptCacheWriteTokens: 1.25,
  promptCacheReadTokens: 0.1,
  webSearchRequests: 0.01,
} as const satisfies ModelCosts

const DEFAULT_UNKNOWN_MODEL_COST = COST_TIER_5_25

/**
 * Get the cost tier for Opus 4.6 based on fast mode.
 */
export function getOpus46CostTier(fastMode: boolean): ModelCosts {
  if (isFastModeEnabled() && fastMode) {
    return COST_TIER_30_150
  }
  return COST_TIER_5_25
}

// DeepSeek pricing — verified 2026-05-06 from api-docs.deepseek.com/quick_start/pricing
// deepseek-chat / deepseek-reasoner / deepseek-v4-flash all share the same rate.
// Cache hit price is 1/10 of input miss as of 2026-04-26.
export const COST_DEEPSEEK_CHAT: ModelCosts = {
  inputTokens: 0.14,
  outputTokens: 0.28,
  promptCacheWriteTokens: 0.14,
  promptCacheReadTokens: 0.0028,
  webSearchRequests: 0,
}

// deepseek-reasoner is now the thinking mode of deepseek-v4-flash — same price as chat.
export const COST_DEEPSEEK_REASONER: ModelCosts = COST_DEEPSEEK_CHAT

// deepseek-v4-pro — list price $1.74/$3.48 with a 75% discount through 2026-05-31.
// Numbers below reflect the discounted rate the API actually charges.
export const COST_DEEPSEEK_V4_PRO: ModelCosts = {
  inputTokens: 0.435,
  outputTokens: 0.87,
  promptCacheWriteTokens: 0.435,
  promptCacheReadTokens: 0.003625,
  webSearchRequests: 0,
}

// Zero-cost fallback for unknown OpenAI-shim models. Used so we don't
// charge Sonnet rates ($3/$15) by default when the model name doesn't match.
const COST_ZERO: ModelCosts = {
  inputTokens: 0,
  outputTokens: 0,
  promptCacheWriteTokens: 0,
  promptCacheReadTokens: 0,
  webSearchRequests: 0,
}

const cost = (
  inp: number,
  out: number,
  cacheR: number = inp,
  cacheW: number = inp,
): ModelCosts => ({
  inputTokens: inp,
  outputTokens: out,
  promptCacheWriteTokens: cacheW,
  promptCacheReadTokens: cacheR,
  webSearchRequests: 0,
})

// Fuzzy substring match for unknown model names — covers OpenRouter aliases,
// custom proxy names, and providers we don't have an explicit MODEL_COSTS entry for.
// Order matters: most specific patterns (e.g. "gpt-5-nano") must come before
// less specific ones (e.g. "gpt-5"). All prices in USD per million tokens.
function fuzzyMatchModelCosts(model: string): ModelCosts | null {
  const m = model.toLowerCase()

  // DeepSeek family — most specific first
  if (m.includes('v4-pro') || m.includes('v4pro')) return COST_DEEPSEEK_V4_PRO
  if (m.includes('deepseek-r1') || m.includes('reasoner')) return COST_DEEPSEEK_REASONER
  if (m.includes('deepseek')) return COST_DEEPSEEK_CHAT

  // OpenAI GPT family (platform.openai.com/docs/pricing)
  if (m.includes('gpt-5-nano')) return cost(0.05, 0.40, 0.005)
  if (m.includes('gpt-5-mini') || m.includes('gpt-5.1-mini')) return cost(0.25, 2.00, 0.025)
  if (m.includes('gpt-5') || m.includes('gpt-5.1')) return cost(1.25, 10.00, 0.125)
  if (m.includes('gpt-4o-mini') || m.includes('gpt-4.1-mini')) return cost(0.15, 0.60, 0.075)
  if (m.includes('gpt-4o') || m.includes('gpt-4.1')) return cost(2.50, 10.00, 1.25)
  if (m.includes('gpt-4-turbo')) return cost(10.00, 30.00)
  if (m.includes('gpt-4')) return cost(30.00, 60.00)
  if (m.includes('gpt-3.5')) return cost(0.50, 1.50)
  if (m.includes('o3-mini') || m.includes('o4-mini')) return cost(1.10, 4.40, 0.55)
  if (m.includes('o3')) return cost(2.00, 8.00, 0.50)
  if (m.includes('o1-mini')) return cost(1.10, 4.40, 0.55)
  if (m.includes('o1')) return cost(15.00, 60.00, 7.50)

  // Gemini (ai.google.dev/pricing)
  if (m.includes('flash-lite')) return cost(0.10, 0.40, 0.025)
  if (m.includes('gemini') && m.includes('flash')) return cost(0.30, 2.50, 0.075)
  if (m.includes('gemini')) return cost(1.25, 10.00, 0.31)

  // Mistral
  if (m.includes('mistral-large') || m.includes('codestral-mamba')) return cost(2.00, 6.00)
  if (m.includes('mistral-medium')) return cost(0.40, 2.00)
  if (m.includes('mistral-small') || m.includes('codestral')) return cost(0.20, 0.60)
  if (m.includes('mistral') || m.includes('mixtral')) return cost(0.30, 0.90)

  // Qwen / Alibaba
  if (m.includes('qwen3-coder') || m.includes('qwen-coder')) return cost(0.30, 1.20)
  if (m.includes('qwen')) return cost(0.40, 1.20)

  // GLM / Zhipu
  if (m.includes('glm-4.6') || m.includes('glm-4-plus')) return cost(0.60, 2.20)
  if (m.includes('glm')) return cost(0.50, 2.00)

  // Kimi / Moonshot
  if (m.includes('kimi-k2') || m.includes('kimi-2')) return cost(0.60, 2.50, 0.15)
  if (m.includes('kimi') || m.includes('moonshot')) return cost(1.00, 3.00)

  // Llama / Meta — typical OpenRouter/Together/Fireworks rates
  if (m.includes('llama-3.3') || m.includes('llama-3.1-405')) return cost(0.80, 0.80)
  if (m.includes('llama-3') || m.includes('llama3')) return cost(0.20, 0.60)
  if (m.includes('llama')) return cost(0.30, 0.90)

  // xAI Grok
  if (m.includes('grok-code')) return cost(0.20, 1.50)
  if (m.includes('grok-4-fast') || m.includes('grok-3-mini')) return cost(0.30, 1.50)
  if (m.includes('grok')) return cost(3.00, 15.00)

  // Local / self-hosted (Ollama, LM Studio, vLLM) — free, name-detect from common URL hints.
  // We can't see the URL here, so heuristic: explicit "local" / "ollama" / "lm-studio" in name.
  if (m.includes('ollama') || m.includes('lm-studio') || m.includes('lmstudio') || m.includes('vllm')) {
    return COST_ZERO
  }

  return null
}

// @[MODEL LAUNCH]: Add a pricing entry for the new model below.
// Costs from https://platform.claude.com/docs/en/about-claude/pricing
// Web search cost: $10 per 1000 requests = $0.01 per request
export const MODEL_COSTS: Record<ModelShortName, ModelCosts> = {
  // DeepSeek models
  'deepseek-chat': COST_DEEPSEEK_CHAT,
  'deepseek-v4-flash': COST_DEEPSEEK_CHAT,
  'deepseek-v4-pro': COST_DEEPSEEK_V4_PRO,
  'deepseek-reasoner': COST_DEEPSEEK_REASONER,
  [firstPartyNameToCanonical(CLAUDE_3_5_HAIKU_CONFIG.firstParty)]:
    COST_HAIKU_35,
  [firstPartyNameToCanonical(CLAUDE_HAIKU_4_5_CONFIG.firstParty)]:
    COST_HAIKU_45,
  [firstPartyNameToCanonical(CLAUDE_3_5_V2_SONNET_CONFIG.firstParty)]:
    COST_TIER_3_15,
  [firstPartyNameToCanonical(CLAUDE_3_7_SONNET_CONFIG.firstParty)]:
    COST_TIER_3_15,
  [firstPartyNameToCanonical(CLAUDE_SONNET_4_CONFIG.firstParty)]:
    COST_TIER_3_15,
  [firstPartyNameToCanonical(CLAUDE_SONNET_4_5_CONFIG.firstParty)]:
    COST_TIER_3_15,
  [firstPartyNameToCanonical(CLAUDE_SONNET_4_6_CONFIG.firstParty)]:
    COST_TIER_3_15,
  [firstPartyNameToCanonical(CLAUDE_OPUS_4_CONFIG.firstParty)]: COST_TIER_15_75,
  [firstPartyNameToCanonical(CLAUDE_OPUS_4_1_CONFIG.firstParty)]:
    COST_TIER_15_75,
  [firstPartyNameToCanonical(CLAUDE_OPUS_4_5_CONFIG.firstParty)]:
    COST_TIER_5_25,
  [firstPartyNameToCanonical(CLAUDE_OPUS_4_6_CONFIG.firstParty)]:
    COST_TIER_5_25,
  [firstPartyNameToCanonical(CLAUDE_OPUS_4_7_CONFIG.firstParty)]:
    COST_TIER_5_25,
}

/**
 * Calculates the USD cost based on token usage and model cost configuration
 */
function tokensToUSDCost(modelCosts: ModelCosts, usage: Usage): number {
  return (
    (usage.input_tokens / 1_000_000) * modelCosts.inputTokens +
    (usage.output_tokens / 1_000_000) * modelCosts.outputTokens +
    ((usage.cache_read_input_tokens ?? 0) / 1_000_000) *
      modelCosts.promptCacheReadTokens +
    ((usage.cache_creation_input_tokens ?? 0) / 1_000_000) *
      modelCosts.promptCacheWriteTokens +
    (usage.server_tool_use?.web_search_requests ?? 0) *
      modelCosts.webSearchRequests
  )
}

export function getModelCosts(model: string, usage: Usage): ModelCosts {
  const shortName = getCanonicalName(model)

  // Check if this is an Opus 4.6 model with fast mode active.
  if (
    shortName === firstPartyNameToCanonical(CLAUDE_OPUS_4_6_CONFIG.firstParty)
  ) {
    const isFastMode = usage.speed === 'fast'
    return getOpus46CostTier(isFastMode)
  }

  const costs = MODEL_COSTS[shortName]
  if (costs) return costs

  // Fuzzy-match before falling back. Covers OpenRouter aliases (e.g.
  // "deepseek/deepseek-chat"), custom proxy names, and providers we don't
  // have an explicit entry for (GPT, Gemini, Mistral, Qwen, etc.).
  const fuzzy = fuzzyMatchModelCosts(model) ?? fuzzyMatchModelCosts(shortName)
  if (fuzzy) return fuzzy

  trackUnknownModelCost(model, shortName)

  // Don't charge Sonnet rates for unknown models when running on a
  // third-party OpenAI-compatible provider — return zero so the UI shows
  // an unknown cost rather than an inflated fake number.
  if (isEnvTruthy(process.env.CLAUDE_CODE_USE_OPENAI)) {
    return COST_ZERO
  }

  return (
    MODEL_COSTS[getCanonicalName(getDefaultMainLoopModelSetting())] ??
    DEFAULT_UNKNOWN_MODEL_COST
  )
}

function trackUnknownModelCost(model: string, shortName: ModelShortName): void {
  logEvent('tengu_unknown_model_cost', {
    model: model as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
    shortName:
      shortName as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
  })
  setHasUnknownModelCost()
}

// Calculate the cost of a query in US dollars.
// If the model's costs are not found, use the default model's costs.
export function calculateUSDCost(resolvedModel: string, usage: Usage): number {
  const modelCosts = getModelCosts(resolvedModel, usage)
  return tokensToUSDCost(modelCosts, usage)
}

/**
 * Calculate cost from raw token counts without requiring a full BetaUsage object.
 * Useful for side queries (e.g. classifier) that track token counts independently.
 */
export function calculateCostFromTokens(
  model: string,
  tokens: {
    inputTokens: number
    outputTokens: number
    cacheReadInputTokens: number
    cacheCreationInputTokens: number
  },
): number {
  const usage: Usage = {
    input_tokens: tokens.inputTokens,
    output_tokens: tokens.outputTokens,
    cache_read_input_tokens: tokens.cacheReadInputTokens,
    cache_creation_input_tokens: tokens.cacheCreationInputTokens,
  } as Usage
  return calculateUSDCost(model, usage)
}

function formatPrice(price: number): string {
  // Format price: integers without decimals, others with 2 decimal places
  // e.g., 3 -> "$3", 0.8 -> "$0.80", 22.5 -> "$22.50"
  if (Number.isInteger(price)) {
    return `$${price}`
  }
  return `$${price.toFixed(2)}`
}

/**
 * Format model costs as a pricing string for display
 * e.g., "$3/$15 per Mtok"
 */
export function formatModelPricing(costs: ModelCosts): string {
  return `${formatPrice(costs.inputTokens)}/${formatPrice(costs.outputTokens)} per Mtok`
}

/**
 * Get formatted pricing string for a model
 * Accepts either a short name or full model name
 * Returns undefined if model is not found
 */
export function getModelPricingString(model: string): string | undefined {
  const shortName = getCanonicalName(model)
  const costs = MODEL_COSTS[shortName]
  if (!costs) return undefined
  return formatModelPricing(costs)
}
