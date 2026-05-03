#!/usr/bin/env python3
"""MCP server for twin — project-aware Obsidian vault integration."""

import os
import re
import yaml
from datetime import datetime
from pathlib import Path
from mcp.server.fastmcp import FastMCP

VAULT_PATH = Path(os.environ.get("OBSIDIAN_VAULT", "/home/neo/Documents/n3o"))

mcp = FastMCP("twin-memory")


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

def _resolve(name: str) -> Path:
    if not name.endswith(".md"):
        name += ".md"
    p = (VAULT_PATH / name).resolve()
    if not str(p).startswith(str(VAULT_PATH.resolve())):
        raise ValueError("Path traversal blocked")
    return p


def _parse_frontmatter(content: str) -> tuple[dict, str]:
    if content.startswith("---\n"):
        end = content.find("\n---\n", 4)
        if end != -1:
            try:
                fm = yaml.safe_load(content[4:end]) or {}
            except yaml.YAMLError:
                fm = {}
            return fm, content[end + 5:]
    return {}, content


def _project_note_path(cwd: str) -> Path:
    """Map a cwd path to its vault project note using full relative path.
    Auto-migrates legacy flat files (twin/bb.md) to twin/Desktop/bb/README.md.
    """
    try:
        rel = str(Path(cwd).relative_to(Path.home()))
    except ValueError:
        rel = Path(cwd).name
    name = Path(cwd).name
    target = VAULT_PATH / "twin" / rel / "README.md"

    # If already in right place, done
    if target.exists():
        return target

    # Check for legacy flat file and migrate it
    for legacy in [
        VAULT_PATH / "twin" / f"{name}.md",
        VAULT_PATH / "twin" / name / "README.md",
    ]:
        if legacy.exists():
            target.parent.mkdir(parents=True, exist_ok=True)
            legacy.rename(target)
            return target

    return target


def _update_section(content: str, header: str, new_body: str) -> str:
    """Replace a markdown section body. Creates section if missing."""
    pattern = rf"(^|\n)(#{{{header.count('#')}}} {re.escape(header.lstrip('#').strip())})\n.*?(?=\n#|\Z)"
    match = re.search(pattern, content, re.DOTALL)
    section = f"\n{header}\n{new_body}"
    if match:
        return content[:match.start()] + section + content[match.end():]
    return content.rstrip() + "\n" + section + "\n"


# ---------------------------------------------------------------------------
# Project memory tools (twin-specific)
# ---------------------------------------------------------------------------

@mcp.tool()
def get_project_context(cwd: str) -> str:
    """Get the project memory note for a given working directory.
    Call this at the start of a session to load context about the project.

    Args:
        cwd: Absolute path of the working directory (e.g. /home/neo/Desktop/dev/sana)
    """
    p = _project_note_path(cwd)
    if not p.exists():
        return f"No project note found for '{Path(cwd).name}'. Use session_start to create one."
    return p.read_text(errors="replace")


@mcp.tool()
def session_start(cwd: str, goal: str = "") -> str:
    """Log the start of a twin session for a project. Creates the project note if needed.
    Call this automatically when twin launches in a project directory.

    Args:
        cwd: Absolute path of the working directory
        goal: Optional goal or task for this session
    """
    p = _project_note_path(cwd)
    name = Path(cwd).name
    now = datetime.now().strftime("%Y-%m-%d %H:%M")

    if not p.exists():
        p.parent.mkdir(parents=True, exist_ok=True)
        content = f"# {name}\n\n## Context\n\n<!-- Describe this project here -->\n\n## Next Steps\n\n<!-- What needs to be done -->\n\n## Sessions\n\n"
        p.write_text(content)

    entry = f"### {now}"
    if goal:
        entry += f" — {goal}"
    entry += "\n\n- Session started\n"

    existing = p.read_text(errors="replace")
    if "## Sessions" in existing:
        existing = existing.replace("## Sessions\n", f"## Sessions\n\n{entry}")
    else:
        existing = existing.rstrip() + f"\n\n## Sessions\n\n{entry}"

    p.write_text(existing)
    rel = p.relative_to(VAULT_PATH)
    return f"Session started → {rel}\n\n{p.read_text(errors='replace')}"


@mcp.tool()
def session_end(cwd: str, summary: str) -> str:
    """Log a summary at the end of a twin session.

    Args:
        cwd: Absolute path of the working directory
        summary: What was accomplished this session (1-3 sentences)
    """
    p = _project_note_path(cwd)
    if not p.exists():
        return f"No project note found for '{Path(cwd).name}'"

    now = datetime.now().strftime("%H:%M")
    entry = f"- [{now}] Session ended: {summary}\n"

    existing = p.read_text(errors="replace")
    # Find the last session block and append there
    last_session = existing.rfind("### ")
    if last_session != -1:
        next_section = existing.find("\n### ", last_session + 1)
        if next_section == -1:
            existing = existing.rstrip() + "\n" + entry
        else:
            existing = existing[:next_section] + "\n" + entry + existing[next_section:]
    else:
        existing = existing.rstrip() + "\n" + entry

    p.write_text(existing)
    return f"Session logged → {p.relative_to(VAULT_PATH)}"


@mcp.tool()
def update_progress(cwd: str, text: str) -> str:
    """Append a timestamped progress note to the current project.
    Use this when something important happens mid-session: a bug found, a decision made, something finished.

    Args:
        cwd: Absolute path of the working directory
        text: What happened / was done
    """
    p = _project_note_path(cwd)
    if not p.exists():
        return f"No project note for '{Path(cwd).name}'. Run session_start first."

    now = datetime.now().strftime("%H:%M")
    entry = f"- [{now}] {text}\n"

    existing = p.read_text(errors="replace")
    last_session = existing.rfind("### ")
    if last_session != -1:
        next_section = existing.find("\n### ", last_session + 1)
        if next_section == -1:
            existing = existing.rstrip() + "\n" + entry
        else:
            existing = existing[:next_section] + "\n" + entry + existing[next_section:]
    else:
        existing = existing.rstrip() + "\n" + entry

    p.write_text(existing)
    return f"Progress logged → {p.relative_to(VAULT_PATH)}"


@mcp.tool()
def set_next_steps(cwd: str, steps: str) -> str:
    """Update the Next Steps section of the project note.
    Call this at the end of a session so the next session knows what to pick up.

    Args:
        cwd: Absolute path of the working directory
        steps: Markdown list of next steps (will replace existing Next Steps section)
    """
    p = _project_note_path(cwd)
    if not p.exists():
        return f"No project note for '{Path(cwd).name}'. Run session_start first."

    existing = p.read_text(errors="replace")
    updated = _update_section(existing, "## Next Steps", steps)
    p.write_text(updated)
    return f"Next steps updated → {p.relative_to(VAULT_PATH)}"


@mcp.tool()
def set_project_context(cwd: str, context: str) -> str:
    """Update the Context section of the project note (what this project is, stack, goals).

    Args:
        cwd: Absolute path of the working directory
        context: Markdown description of the project
    """
    p = _project_note_path(cwd)
    if not p.exists():
        return f"No project note for '{Path(cwd).name}'. Run session_start first."

    existing = p.read_text(errors="replace")
    updated = _update_section(existing, "## Context", context)
    p.write_text(updated)
    return f"Context updated → {p.relative_to(VAULT_PATH)}"


# ---------------------------------------------------------------------------
# General vault tools (kept from obsidian-mcp)
# ---------------------------------------------------------------------------

@mcp.tool()
def list_notes(folder: str = "", tag: str = "") -> str:
    """List notes in the vault. Optionally filter by folder or tag.

    Args:
        folder: Subfolder to list (empty for all)
        tag: Filter notes containing this tag (without #)
    """
    base = VAULT_PATH / folder if folder else VAULT_PATH
    if not base.exists():
        return f"Folder not found: {folder}"

    notes = []
    for p in sorted(base.rglob("*.md")):
        if ".obsidian" in p.parts or ".trash" in p.parts:
            continue
        if tag:
            content = p.read_text(errors="replace")
            fm, body = _parse_frontmatter(content)
            fm_tags = fm.get("tags", []) if isinstance(fm.get("tags"), list) else []
            all_tags = set(fm_tags) | set(re.findall(r'(?:^|\s)#([a-zA-Z][\w/-]*)', body))
            if tag not in all_tags:
                continue
        notes.append(str(p.relative_to(VAULT_PATH)))

    return "\n".join(notes) if notes else "No notes found"


@mcp.tool()
def read_note(name: str) -> str:
    """Read the full content of a note.

    Args:
        name: Note path relative to vault root (e.g. "Projects/sana.md")
    """
    p = _resolve(name)
    if not p.exists():
        return f"Note not found: {name}"
    return p.read_text(errors="replace")


@mcp.tool()
def create_note(name: str, content: str, tags: list[str] | None = None) -> str:
    """Create a new note. Fails if it already exists.

    Args:
        name: Note path relative to vault root
        content: Markdown content
        tags: Optional frontmatter tags
    """
    p = _resolve(name)
    if p.exists():
        return f"Note already exists: {name}. Use edit_note to modify."
    p.parent.mkdir(parents=True, exist_ok=True)
    content = content.replace('\\n', '\n').replace('\\t', '\t')
    if tags:
        fm = yaml.dump({"tags": tags}, default_flow_style=True).strip()
        content = f"---\n{fm}\n---\n{content}"
    p.write_text(content)
    return f"Created: {p.relative_to(VAULT_PATH)}"


@mcp.tool()
def edit_note(name: str, content: str) -> str:
    """Replace the entire content of a note.

    Args:
        name: Note path relative to vault root
        content: New markdown content
    """
    p = _resolve(name)
    if not p.exists():
        return f"Note not found: {name}"
    # Unescape literal \n sequences that models sometimes emit
    content = content.replace('\\n', '\n').replace('\\t', '\t')
    p.write_text(content)
    return f"Updated: {p.relative_to(VAULT_PATH)}"


@mcp.tool()
def append_to_note(name: str, text: str) -> str:
    """Append text to the end of a note.

    Args:
        name: Note path relative to vault root
        text: Text to append
    """
    p = _resolve(name)
    if not p.exists():
        return f"Note not found: {name}"
    existing = p.read_text(errors="replace")
    text = text.replace('\\n', '\n').replace('\\t', '\t')
    sep = "\n" if existing and not existing.endswith("\n") else ""
    p.write_text(existing + sep + text)
    return f"Appended to: {p.relative_to(VAULT_PATH)}"


@mcp.tool()
def search_notes(query: str, case_sensitive: bool = False) -> str:
    """Regex search across all notes.

    Args:
        query: Text or regex pattern
        case_sensitive: Default false
    """
    flags = 0 if case_sensitive else re.IGNORECASE
    try:
        pattern = re.compile(query, flags)
    except re.error:
        pattern = re.compile(re.escape(query), flags)

    results = []
    for p in sorted(VAULT_PATH.rglob("*.md")):
        if ".obsidian" in p.parts or ".trash" in p.parts:
            continue
        content = p.read_text(errors="replace")
        matches = []
        for i, line in enumerate(content.split("\n"), 1):
            if pattern.search(line):
                matches.append(f"  L{i}: {line.strip()[:150]}")
        if matches:
            rel = p.relative_to(VAULT_PATH)
            results.append(f"{rel}\n" + "\n".join(matches[:5]))
            if len(matches) > 5:
                results[-1] += f"\n  ... +{len(matches)-5} more"

    return "\n\n".join(results[:20]) if results else f"No matches for: {query}"


@mcp.tool()
def daily_note(content: str | None = None) -> str:
    """Get or create today's daily note. Appends content if provided.

    Args:
        content: Optional text to append
    """
    today = datetime.now().strftime("%Y-%m-%d")
    p = VAULT_PATH / f"{today}.md"
    if not p.exists():
        p.write_text(f"# {today}\n\n{content or ''}")
        return f"Created daily note: {today}.md"
    if content:
        existing = p.read_text(errors="replace")
        sep = "\n" if not existing.endswith("\n") else ""
        p.write_text(existing + sep + content)
        return f"Appended to daily note: {today}.md"
    return p.read_text(errors="replace")


@mcp.tool()
def list_tags() -> str:
    """List all tags in the vault with usage counts."""
    tag_counts: dict[str, int] = {}
    for p in sorted(VAULT_PATH.rglob("*.md")):
        if ".obsidian" in p.parts or ".trash" in p.parts:
            continue
        content = p.read_text(errors="replace")
        fm, body = _parse_frontmatter(content)
        fm_tags = fm.get("tags", []) if isinstance(fm.get("tags"), list) else []
        inline = re.findall(r'(?:^|\s)#([a-zA-Z][\w/-]*)', body)
        for t in set(fm_tags) | set(inline):
            tag_counts[t] = tag_counts.get(t, 0) + 1
    if not tag_counts:
        return "No tags found"
    return "\n".join(f"#{t} ({c})" for t, c in sorted(tag_counts.items(), key=lambda x: -x[1]))


@mcp.tool()
def list_folders() -> str:
    """List the vault folder structure."""
    folders = set()
    for p in VAULT_PATH.rglob("*.md"):
        if ".obsidian" in p.parts or ".trash" in p.parts:
            continue
        rel = p.relative_to(VAULT_PATH).parent
        if str(rel) != ".":
            folders.add(str(rel))
    return "\n".join(sorted(folders)) if folders else "(all notes in vault root)"


@mcp.tool()
def move_note(source: str, destination: str) -> str:
    """Move or rename a note.

    Args:
        source: Current note path relative to vault
        destination: New note path relative to vault
    """
    src = _resolve(source)
    dst = _resolve(destination)
    if not src.exists():
        return f"Source not found: {source}"
    if dst.exists():
        return f"Destination already exists: {destination}"
    dst.parent.mkdir(parents=True, exist_ok=True)
    src.rename(dst)
    return f"Moved: {src.relative_to(VAULT_PATH)} → {dst.relative_to(VAULT_PATH)}"


@mcp.tool()
def note_info(name: str) -> str:
    """Get metadata about a note: tags, links, frontmatter, line count.

    Args:
        name: Note path relative to vault root
    """
    p = _resolve(name)
    if not p.exists():
        return f"Note not found: {name}"
    content = p.read_text(errors="replace")
    fm, body = _parse_frontmatter(content)
    tags = set(fm.get("tags", []) if isinstance(fm.get("tags"), list) else [])
    tags.update(re.findall(r'(?:^|\s)#([a-zA-Z][\w/-]*)', body))
    links = re.findall(r'\[\[([^\]|]+)(?:\|[^\]]+)?\]\]', body)
    lines = body.strip().split("\n")
    out = [
        f"Path: {p.relative_to(VAULT_PATH)}",
        f"Lines: {len(lines)}",
        f"Tags: {', '.join(sorted(tags)) or 'none'}",
        f"Links: {', '.join(links) or 'none'}",
    ]
    if fm:
        out.append(f"Frontmatter: {fm}")
    return "\n".join(out)


@mcp.tool()
def delete_note(name: str) -> str:
    """Move a note to .trash/ (recoverable).

    Args:
        name: Note path relative to vault root
    """
    p = _resolve(name)
    if not p.exists():
        return f"Note not found: {name}"
    trash = VAULT_PATH / ".trash"
    trash.mkdir(exist_ok=True)
    dest = trash / p.relative_to(VAULT_PATH)
    dest.parent.mkdir(parents=True, exist_ok=True)
    p.rename(dest)
    return f"Moved to trash: {name}"


if __name__ == "__main__":
    mcp.run()
