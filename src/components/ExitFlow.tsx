import { c as _c } from "react-compiler-runtime";
import sample from 'lodash-es/sample.js';
import React from 'react';
import { gracefulShutdown } from '../utils/gracefulShutdown.js';
import { WorktreeExitDialog } from './WorktreeExitDialog.js';
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
type Props = {
  onDone: (message?: string) => void;
  onCancel?: () => void;
  showWorktree: boolean;
};
export function ExitFlow(t0) {
  const $ = _c(5);
  const {
    showWorktree,
    onDone,
    onCancel
  } = t0;
  let t1;
  if ($[0] !== onDone) {
    t1 = async function onExit(resultMessage) {
      onDone(resultMessage ?? getRandomGoodbyeMessage());
      await gracefulShutdown(0, "prompt_input_exit");
    };
    $[0] = onDone;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  const onExit = t1;
  if (showWorktree) {
    let t2;
    if ($[2] !== onCancel || $[3] !== onExit) {
      t2 = <WorktreeExitDialog onDone={onExit} onCancel={onCancel} />;
      $[2] = onCancel;
      $[3] = onExit;
      $[4] = t2;
    } else {
      t2 = $[4];
    }
    return t2;
  }
  return null;
}
