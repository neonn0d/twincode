#!/usr/bin/env python3
"""SessionStart hook: inject last session note from Obsidian as context."""

import json
import os
import sys
from pathlib import Path

VAULT_PATH = Path(os.environ.get("OBSIDIAN_VAULT", "/home/neo/Documents/n3o"))


def main():
    try:
        data = json.loads(sys.stdin.read())
    except (json.JSONDecodeError, OSError):
        sys.exit(0)

    # Only inject on fresh startup, not after compact/clear/resume
    source = data.get("source", "")
    if source not in ("startup",):
        sys.exit(0)

    cwd = data.get("cwd", "")
    if not cwd:
        sys.exit(0)

    home = Path.home()
    try:
        rel = Path(cwd).relative_to(home)
    except ValueError:
        rel = Path(Path(cwd).name)
    project = str(rel)  # e.g. "Desktop/bb"

    sessions_dir = VAULT_PATH / "twin" / project / "sessions"
    if not sessions_dir.exists():
        sys.exit(0)

    # Find the most recent session note
    notes = sorted(sessions_dir.glob("*.md"), key=lambda p: p.stat().st_mtime, reverse=True)
    if not notes:
        sys.exit(0)

    last_note = notes[0]
    content = last_note.read_text().strip()
    if not content:
        sys.exit(0)

    context = f"[Previous session — {last_note.stem}]\n{content}"

    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "SessionStart",
            "additionalContext": context,
        }
    }))


if __name__ == "__main__":
    main()
