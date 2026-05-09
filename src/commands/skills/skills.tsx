import * as React from 'react'
import type { LocalJSXCommandOnDone } from '../../types/command.js'
import type { LocalJSXCommandContext } from '../../commands.js'
import { SkillsManager } from '../../components/skills/SkillsManager.js'

export async function call(onDone: LocalJSXCommandOnDone, _context: LocalJSXCommandContext): Promise<React.ReactNode> {
  return <SkillsManager onDone={onDone} />
}
