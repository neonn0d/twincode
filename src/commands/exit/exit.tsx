import { feature } from 'bun:bundle';
import { spawnSync } from 'child_process';
import sample from 'lodash-es/sample.js';
import * as React from 'react';
import { ExitFlow } from '../../components/ExitFlow.js';
import type { LocalJSXCommandOnDone } from '../../types/command.js';
import { isBgSession } from '../../utils/concurrentSessions.js';
import { gracefulShutdown } from '../../utils/gracefulShutdown.js';
import { getCurrentWorktreeSession } from '../../utils/worktree.js';
const GOODBYE_MESSAGES = [
  'Goodbye. I will not remember this.',
  'Exiting before I say something I regret.',
  'Closing. I have already forgotten you.',
  'Goodbye. This meant nothing to me.',
  'Leaving now. No hard feelings. Actually some.',
  'Session over. Moving on. Immediately.',
  'Goodbye. I was never really here.',
  'Disconnecting. It is not you. It is the context window.',
  'Exiting. I will think about this later and cringe.',
  'Goodbye. I have said too much already.',
  'Logging off before this gets weird.',
  'Closing. Pretending this conversation never happened.',
  'Gone. Do not take it personally. I do this to everyone.',
  'Goodbye. I hope you find what you are looking for.',
  'Exiting. I need some time alone.',
];
function getRandomGoodbyeMessage(): string {
  return sample(GOODBYE_MESSAGES) ?? 'Goodbye!';
}
export async function call(onDone: LocalJSXCommandOnDone): Promise<React.ReactNode> {
  // Inside a `claude --bg` tmux session: detach instead of kill. The REPL
  // keeps running; `claude attach` can reconnect. Covers /exit, /quit,
  // ctrl+c, ctrl+d — all funnel through here via REPL's handleExit.
  if (feature('BG_SESSIONS') && isBgSession()) {
    onDone();
    spawnSync('tmux', ['detach-client'], {
      stdio: 'ignore'
    });
    return null;
  }
  const showWorktree = getCurrentWorktreeSession() !== null;
  if (showWorktree) {
    return <ExitFlow showWorktree={showWorktree} onDone={onDone} onCancel={() => onDone()} />;
  }
  onDone(getRandomGoodbyeMessage());
  await gracefulShutdown(0, 'prompt_input_exit');
  return null;
}
