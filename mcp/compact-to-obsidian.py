#!/usr/bin/env python3
"""PostCompact hook: save compact summary to Obsidian vault."""

import json
import os
import sys
from datetime import datetime
from pathlib import Path

VAULT_PATH = Path(os.environ.get("OBSIDIAN_VAULT", "/home/neo/Documents/n3o"))
DEBUG_LOG = Path.home() / ".twin" / "compact-hook-debug.log"


def log(msg: str):
    with open(DEBUG_LOG, "a") as f:
        f.write(f"[{datetime.now().isoformat()}] {msg}\n")


def main():
    try:
        raw = sys.stdin.read()
        log(f"called, raw input length={len(raw)}")
        data = json.loads(raw)
    except (json.JSONDecodeError, OSError) as e:
        log(f"failed to parse input: {e}")
        print(f"compact-to-obsidian: failed to read input: {e}", file=sys.stderr)
        sys.exit(0)

    summary = data.get("compact_summary") or ""
    log(f"compact_summary length={len(summary)}, trigger={data.get('trigger')}")

    if not summary:
        log("empty summary — skipping")
        sys.exit(0)

    import re

    # Extract just the Session Note section (## What we did / ## Blocked / ## What's next)
    session_note = None
    m = re.search(r'## What we did\b(.*?)(?=\n#[^#]|\Z)', summary, re.DOTALL)
    if m:
        session_note = ("## What we did" + m.group(1)).strip()
        # Strip any trailing XML closing tags
        session_note = re.sub(r'\s*</\w+>\s*$', '', session_note).strip()
        # Dedent
        lines = session_note.splitlines()
        session_note = "\n".join(line.lstrip() for line in lines)

    if session_note:
        summary = session_note
    else:
        # Strip XML-like tags from raw summary
        summary = re.sub(r'<[^>]+>', '', summary).strip()

    cwd = data.get("cwd", "")
    trigger = data.get("trigger", "auto")

    # Build vault path from cwd relative to home, e.g. ~/Desktop/bb → twin/Desktop/bb/sessions
    home = Path.home()
    try:
        rel = Path(cwd).relative_to(home)
    except (ValueError, TypeError):
        rel = Path(cwd).name if cwd else Path("unknown")
    project = str(rel)  # e.g. "Desktop/bb"

    now = datetime.now()
    filename = now.strftime("%Y-%m-%d-%H-%M") + ".md"
    sessions_dir = VAULT_PATH / "twin" / project / "sessions"
    sessions_dir.mkdir(parents=True, exist_ok=True)
    note_path = sessions_dir / filename

    counter = 1
    while note_path.exists():
        stem = now.strftime("%Y-%m-%d-%H-%M")
        note_path = sessions_dir / f"{stem}-{counter}.md"
        counter += 1

    date_str = now.strftime("%Y-%m-%d %H:%M")
    content = f"# Session — {date_str}\n\n**Project:** {cwd}  \n**Trigger:** {trigger}  \n\n---\n\n{summary}\n"
    note_path.write_text(content)
    log(f"saved → {note_path}")
    print(f"Saved compact summary → twin/{project}/sessions/{note_path.name}")


if __name__ == "__main__":
    main()
