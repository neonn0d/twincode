import { existsSync, readFileSync, readdirSync, rmSync } from 'fs'
import { homedir } from 'os'
import { join } from 'path'
import { spawnSync } from 'child_process'
import * as React from 'react'
import { useState, useCallback } from 'react'
import figures from 'figures'
import { Box, Text, useInput, useStdin } from '../../ink.js'
import { Dialog } from '../design-system/Dialog.js'
import FullWidthRow from '../design-system/FullWidthRow.js'
import { SkillNewForm } from '../../commands/skill-new/skill-new.js'
import { clearSkillCaches } from '../../skills/loadSkillsDir.js'
import { clearCommandMemoizationCaches } from '../../commands.js'
import { getCwd } from '../../utils/cwd.js'
import type { LocalJSXCommandOnDone } from '../../types/command.js'

type SkillEntry = {
  name: string
  description: string
  filePath: string
  source: 'project' | 'global'
}

type Screen = 'list' | 'create' | 'delete-confirm'

function parseFrontmatter(raw: string): { name: string; description: string } {
  let name = ''
  let description = ''
  if (raw.startsWith('---\n')) {
    const end = raw.indexOf('\n---\n', 4)
    if (end !== -1) {
      const fm = raw.slice(4, end)
      const nameLine = fm.match(/^name:\s*(.+)$/m)
      const descLine = fm.match(/^description:\s*(.+)$/m)
      if (nameLine) name = nameLine[1].trim()
      if (descLine) description = descLine[1].trim()
    }
  }
  return { name, description }
}

function loadSkillsFromDisk(cwd: string): SkillEntry[] {
  const dirs: { dir: string; source: 'project' | 'global' }[] = [
    { dir: join(cwd, '.twincode', 'skills'), source: 'project' },
    { dir: join(homedir(), '.twincode', 'skills'), source: 'global' },
  ]

  const seen = new Set<string>()
  const skills: SkillEntry[] = []

  for (const { dir, source } of dirs) {
    if (!existsSync(dir)) continue
    let entries: string[]
    try { entries = readdirSync(dir) } catch { continue }
    for (const entry of entries) {
      const filePath = join(dir, entry, 'SKILL.md')
      if (!existsSync(filePath)) continue
      try {
        const raw = readFileSync(filePath, 'utf8').trim()
        const { name, description } = parseFrontmatter(raw)
        const skillName = name || entry
        if (seen.has(skillName)) continue
        seen.add(skillName)
        skills.push({ name: skillName, description, filePath, source })
      } catch {}
    }
  }

  return skills
}

function clearAllCaches() {
  clearSkillCaches()
  clearCommandMemoizationCaches()
}

export function SkillsManager({ onDone }: { onDone: LocalJSXCommandOnDone }) {
  const cwd = getCwd()
  const { stdin, setRawMode } = useStdin()
  const [screen, setScreen] = useState<Screen>('list')
  const [skills, setSkills] = useState<SkillEntry[]>(() => loadSkillsFromDisk(cwd))
  const [cursor, setCursor] = useState(0)

  const reload = useCallback(() => {
    const fresh = loadSkillsFromDisk(cwd)
    setSkills(fresh)
    setCursor(prev => Math.min(prev, Math.max(0, fresh.length - 1)))
  }, [cwd])

  const selected = skills[cursor] ?? null

  useInput((input, key) => {
    if (screen === 'delete-confirm') {
      if (key.return && selected) {
        try { rmSync(join(selected.filePath, '..'), { recursive: true, force: true }) } catch {}
        clearAllCaches()
        reload()
        setScreen('list')
      } else if (key.escape) {
        setScreen('list')
      }
      return
    }

    if (screen !== 'list') return

    if (key.upArrow || input === 'k') {
      setCursor(prev => (prev <= 0 ? Math.max(0, skills.length - 1) : prev - 1))
      return
    }
    if (key.downArrow || input === 'j') {
      setCursor(prev => (prev >= skills.length - 1 ? 0 : prev + 1))
      return
    }
    if (input === 'c') {
      setScreen('create')
      return
    }
    if (input === 'd' && selected) {
      setScreen('delete-confirm')
      return
    }
    if (input === 'e' && selected) {
      const editor = process.env.EDITOR || process.env.VISUAL || 'nano'
      try {
        setRawMode(false)
        process.stdout.write('\x1b[?1049l')
        spawnSync(editor, [selected.filePath], { stdio: 'inherit' })
        process.stdout.write('\x1b[?1049h')
        setRawMode(true)
      } catch {}
      clearAllCaches()
      reload()
      return
    }
    if (key.escape) {
      onDone('Skills closed.', { display: 'system' })
    }
  }, { isActive: screen === 'list' || screen === 'delete-confirm' })

  if (screen === 'create') {
    return (
      <SkillNewForm
        onDone={(msg, opts) => {
          clearAllCaches()
          reload()
          setScreen('list')
        }}
      />
    )
  }

  const projectSkills = skills.filter(s => s.source === 'project')
  const globalSkills = skills.filter(s => s.source === 'global')

  const footer = screen === 'delete-confirm' && selected ? (
    <FullWidthRow>
      <Text color="red">Delete &quot;{selected.name}&quot;? </Text>
      <Text dimColor>Enter to confirm · Esc to cancel</Text>
    </FullWidthRow>
  ) : (
    <Box flexDirection="column">
      <FullWidthRow>
        <Text dimColor italic>Esc close · </Text>
        <Text color="green" bold>[ c ]</Text>
        <Text dimColor italic> create · </Text>
        <Text color="yellow" bold>[ d ]</Text>
        <Text dimColor italic> delete · </Text>
        <Text color="blue" bold>[ e ]</Text>
        <Text dimColor italic> edit</Text>
      </FullWidthRow>
    </Box>
  )

  const renderSkill = (skill: SkillEntry, index: number) => {
    const isSelected = index === cursor
    return (
      <Box key={skill.filePath}>
        <Text color={isSelected ? 'green' : undefined}>
          {isSelected ? `${figures.pointer} ` : '  '}
        </Text>
        <Text color={isSelected ? 'green' : undefined} bold={isSelected}>
          {skill.name}
        </Text>
        {skill.description ? (
          <Text dimColor> · {skill.description.slice(0, 60)}{skill.description.length > 60 ? '…' : ''}</Text>
        ) : null}
      </Box>
    )
  }

  const content = (
    <Box flexDirection="column" gap={1}>
      {projectSkills.length > 0 && (
        <Box flexDirection="column">
          <FullWidthRow>
            <Text bold dimColor>Project skills</Text>
            <Text dimColor> (.twincode/skills/)</Text>
          </FullWidthRow>
          {projectSkills.map((s, i) => renderSkill(s, i))}
        </Box>
      )}
      {globalSkills.length > 0 && (
        <Box flexDirection="column">
          <FullWidthRow>
            <Text bold dimColor>Global skills</Text>
            <Text dimColor> (~/.twincode/skills/)</Text>
          </FullWidthRow>
          {globalSkills.map((s, i) => renderSkill(s, i + projectSkills.length))}
        </Box>
      )}
      {skills.length === 0 && (
        <Text dimColor>No skills found. Press c to create one.</Text>
      )}
      {footer}
    </Box>
  )

  return (
    <Dialog
      title="Skills"
      subtitle={skills.length === 0 ? 'No skills' : `${skills.length} skill${skills.length === 1 ? '' : 's'}`}
      onCancel={() => onDone('Skills closed.', { display: 'system' })}
      hideInputGuide
    >
      {content}
    </Dialog>
  )
}
