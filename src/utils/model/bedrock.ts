// Bedrock not supported in twin — stub exports to satisfy imports

export const getBedrockInferenceProfiles = async (): Promise<string[]> => []

export function findFirstMatch<T>(
  items: T[],
  _predicate: (item: T) => boolean,
): T | undefined {
  return undefined
}

export async function createBedrockRuntimeClient(): Promise<never> {
  throw new Error('Bedrock not supported in twin')
}

export const getInferenceProfileBackingModel = async (
  _profileId: string,
): Promise<string | null> => null

export function isFoundationModel(modelId: string): boolean {
  return modelId.startsWith('anthropic.')
}

export function extractModelIdFromArn(modelId: string): string {
  if (!modelId.startsWith('arn:')) return modelId
  const lastSlashIndex = modelId.lastIndexOf('/')
  return lastSlashIndex === -1 ? modelId : modelId.substring(lastSlashIndex + 1)
}

const BEDROCK_REGION_PREFIXES = ['us', 'eu', 'apac', 'global'] as const
export type BedrockRegionPrefix = (typeof BEDROCK_REGION_PREFIXES)[number]

export function getBedrockRegionPrefix(
  modelId: string,
): BedrockRegionPrefix | undefined {
  const effectiveModelId = extractModelIdFromArn(modelId)
  for (const prefix of BEDROCK_REGION_PREFIXES) {
    if (effectiveModelId.startsWith(`${prefix}.anthropic.`)) return prefix
  }
  return undefined
}

export function applyBedrockRegionPrefix(
  modelId: string,
  prefix: BedrockRegionPrefix,
): string {
  const existingPrefix = getBedrockRegionPrefix(modelId)
  if (existingPrefix) return modelId.replace(`${existingPrefix}.`, `${prefix}.`)
  if (isFoundationModel(modelId)) return `${prefix}.${modelId}`
  return modelId
}
