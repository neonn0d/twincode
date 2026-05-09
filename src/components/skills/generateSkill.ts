import type { ContentBlock } from '@anthropic-ai/sdk/resources/index.mjs'
import { getUserContext } from 'src/context.js'
import { queryModelWithoutStreaming } from 'src/services/api/claude.js'
import { getEmptyToolPermissionContext } from 'src/Tool.js'
import { prependUserContext } from 'src/utils/api.js'
import { createUserMessage, normalizeMessagesForAPI } from 'src/utils/messages.js'
import type { ModelName } from 'src/utils/model/model.js'
import { jsonParse } from '../../utils/slowOperations.js'
import { asSystemPrompt } from '../../utils/systemPromptType.js'

export type GeneratedSkill = {
  name: string
  description: string
  content: string
}

const SKILL_CREATION_SYSTEM_PROMPT = `You are an expert at creating twincode skill files. Skills are markdown files injected into the AI's system prompt when a task matches their description — they provide specialized instructions for specific tasks.

When a user describes what they want a skill to do, you will:

1. **Choose a name**: A short slug (lowercase, hyphens only, 2-4 words). Specific and memorable — e.g., "react-component", "sql-migration", "api-error-handler". Avoid generic names like "helper" or "assistant".

2. **Write a description**: ONE precise sentence starting with an action verb that tells the AI exactly when to load this skill. This is critical — the AI reads it to decide whether to use the skill. Examples:
   - "Write React functional components following the project's TypeScript patterns and file structure"
   - "Create and run SQL migrations with proper rollback strategies"
   - "Handle API errors with consistent logging, retry logic, and user-facing messages"

3. **Write the skill content**: Comprehensive instructions the AI should follow when performing this task. Include:
   - Specific patterns, conventions, or rules to follow
   - File locations, naming conventions, directory structure
   - Code examples where they clarify behavior
   - Common gotchas or things to avoid
   - Step-by-step process if the task has a clear flow

Be specific, not generic. Every line should add value. Write as if briefing a skilled engineer who knows the tech but doesn't know your project's conventions.

Return ONLY a valid JSON object with exactly these fields:
{
  "name": "slug-name",
  "description": "One precise sentence describing when to use this skill",
  "content": "Full markdown content for the skill body (everything after the frontmatter)"
}`

export async function generateSkill(
  userPrompt: string,
  model: ModelName,
  abortSignal: AbortSignal,
): Promise<GeneratedSkill> {
  const prompt = `Create a twincode skill based on this request: "${userPrompt}"
Return ONLY the JSON object, no other text.`

  const userMessage = createUserMessage({ content: prompt })
  const userContext = await getUserContext()
  const messagesWithContext = prependUserContext([userMessage], userContext)

  const response = await queryModelWithoutStreaming({
    messages: normalizeMessagesForAPI(messagesWithContext),
    systemPrompt: asSystemPrompt([SKILL_CREATION_SYSTEM_PROMPT]),
    thinkingConfig: { type: 'disabled' as const },
    tools: [],
    signal: abortSignal,
    options: {
      getToolPermissionContext: async () => getEmptyToolPermissionContext(),
      model,
      toolChoice: undefined,
      agents: [],
      isNonInteractiveSession: false,
      hasAppendSystemPrompt: false,
      querySource: 'skill_creation',
      mcpTools: [],
    },
  })

  const textBlocks = response.message.content.filter(
    (block): block is ContentBlock & { type: 'text' } => block.type === 'text',
  )
  const responseText = textBlocks.map(b => b.text).join('\n')

  let parsed: GeneratedSkill
  try {
    parsed = jsonParse(responseText.trim())
  } catch {
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON found in response')
    parsed = jsonParse(jsonMatch[0])
  }

  if (!parsed.name || !parsed.description || !parsed.content) {
    throw new Error('Invalid skill configuration generated')
  }

  return {
    name: parsed.name.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''),
    description: parsed.description,
    content: parsed.content,
  }
}
