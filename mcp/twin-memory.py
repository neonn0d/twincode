#!/usr/bin/env python3
"""MCP server for twin — project-aware Obsidian vault integration."""

import os
import re
import textwrap
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


def _project_dir(cwd: str) -> Path:
    """Return the vault directory for this project: twin/<rel>/"""
    try:
        rel = str(Path(cwd).relative_to(Path.home()))
    except ValueError:
        rel = Path(cwd).name
    return VAULT_PATH / "twin" / rel


def _project_note_path(cwd: str) -> Path:
    """Return README.md path for this project. Auto-migrates legacy flat files."""
    d = _project_dir(cwd)
    target = d / "README.md"
    if target.exists():
        return target
    name = Path(cwd).name
    for legacy in [
        VAULT_PATH / "twin" / f"{name}.md",
        VAULT_PATH / "twin" / name / "README.md",
    ]:
        if legacy.exists():
            target.parent.mkdir(parents=True, exist_ok=True)
            legacy.rename(target)
            return target
    return target


def _brain_dir(cwd: str) -> Path:
    """Return the brain directory for this project: twin/<rel>/brain/"""
    return _project_dir(cwd) / "brain"


def _slugify(topic: str) -> str:
    topic = topic.lower().strip()
    topic = re.sub(r'[^a-z0-9\-]+', '-', topic)
    return topic.strip('-')


def _session_file_path(cwd: str) -> Path:
    """Return today's session file: twin/<rel>/sessions/YYYY-MM-DD.md"""
    today = datetime.now().strftime("%Y-%m-%d")
    return _project_dir(cwd) / "sessions" / f"{today}.md"


def _ensure_session_file(cwd: str) -> Path:
    """Create today's session file if it doesn't exist. Returns the path."""
    sf = _session_file_path(cwd)
    if not sf.exists():
        sf.parent.mkdir(parents=True, exist_ok=True)
        name = Path(cwd).name
        today = datetime.now().strftime("%Y-%m-%d")
        sf.write_text(f"# {name} — {today}\n")
    return sf


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
    """Get the project README and today's session file for a given working directory.
    Call this at the start of a session to load context about the project.

    Args:
        cwd: Absolute path of the working directory (e.g. /home/neo/Desktop/dev/sana)
    """
    readme = _project_note_path(cwd)
    sf = _session_file_path(cwd)
    out = []
    if readme.exists():
        out.append(f"=== README ===\n{readme.read_text(errors='replace')}")
    else:
        out.append(f"No project README yet for '{Path(cwd).name}'. Use session_start to create one.")
    if sf.exists():
        out.append(f"=== Today's session ({sf.name}) ===\n{sf.read_text(errors='replace')}")
    return "\n\n".join(out)


@mcp.tool()
def session_start(cwd: str, goal: str = "") -> str:
    """Log the start of a twin session. Creates README + today's session file if needed.
    Adds a timestamped section to sessions/YYYY-MM-DD.md and a link in README.

    Args:
        cwd: Absolute path of the working directory
        goal: Optional goal or task for this session
    """
    name = Path(cwd).name
    now = datetime.now().strftime("%H:%M")
    today = datetime.now().strftime("%Y-%m-%d")

    # Ensure README exists
    readme = _project_note_path(cwd)
    if not readme.exists():
        readme.parent.mkdir(parents=True, exist_ok=True)
        readme.write_text(
            f"# {name}\n\n"
            f"## Context\n\n<!-- Describe this project here -->\n\n"
            f"## Next Steps\n\n<!-- What needs to be done -->\n\n"
            f"## Sessions\n\n"
        )

    # Add session link to README index (once per day)
    readme_text = readme.read_text(errors="replace")
    link = f"[[sessions/{today}]]"
    if link not in readme_text:
        entry = f"- {link}"
        if goal:
            entry += f" — {goal}"
        entry += "\n"
        if "## Sessions" in readme_text:
            readme_text = readme_text.replace("## Sessions\n", f"## Sessions\n\n{entry}", 1)
            # Clean up double blank lines
            readme_text = re.sub(r'\n{3,}', '\n\n', readme_text)
        else:
            readme_text = readme_text.rstrip() + f"\n\n## Sessions\n\n{entry}"
        readme.write_text(readme_text)

    # Append to today's session file
    sf = _ensure_session_file(cwd)
    section = f"\n## {now}"
    if goal:
        section += f" — {goal}"
    section += "\n\n- Session started\n"
    existing = sf.read_text(errors="replace")
    sf.write_text(existing.rstrip() + "\n" + section)

    return f"Session started → {sf.relative_to(VAULT_PATH)}"


@mcp.tool()
def session_end(cwd: str, summary: str) -> str:
    """Log a summary at the end of a twin session. Writes to today's session file.

    Args:
        cwd: Absolute path of the working directory
        summary: What was accomplished this session (1-3 sentences)
    """
    sf = _ensure_session_file(cwd)
    now = datetime.now().strftime("%H:%M")
    entry = f"- [{now}] Session ended: {summary}\n"
    existing = sf.read_text(errors="replace")
    sf.write_text(existing.rstrip() + "\n" + entry)
    return f"Session logged → {sf.relative_to(VAULT_PATH)}"


@mcp.tool()
def update_progress(cwd: str, text: str) -> str:
    """Append a timestamped progress note to today's session file.
    Use this when something important happens mid-session: a bug found, a decision made, something finished.

    Args:
        cwd: Absolute path of the working directory
        text: What happened / was done
    """
    sf = _ensure_session_file(cwd)
    now = datetime.now().strftime("%H:%M")
    entry = f"- [{now}] {text}\n"
    existing = sf.read_text(errors="replace")
    sf.write_text(existing.rstrip() + "\n" + entry)
    return f"Progress logged → {sf.relative_to(VAULT_PATH)}"


@mcp.tool()
def log_session(
    cwd: str,
    title: str,
    summary: str,
    items: list | None = None,
    discoveries: list | None = None,
    warnings: list | None = None,
    tips: list | None = None,
    next_session: str | None = None,
    diagram: str | None = None,
) -> str:
    """Write a formatted session log entry to today's session file.
    Handles create vs append automatically. Generates proper Obsidian markdown.

    Args:
        cwd: Absolute path of the working directory
        title: Short title of what this session was about (e.g. "Fixed trace endpoint + explored HLS proxy")
        summary: 1-2 sentence prose summary of what happened and the outcome
        items: List of {item, detail} dicts for the work table — use file names, route names, feature names as item
        discoveries: List of strings — key findings/insights (rendered as > [!info] blue callouts)
        warnings: List of strings — gotchas or things to watch (rendered as > [!warning] orange callouts)
        tips: List of strings — best practices discovered this session (rendered as > [!tip] cyan callouts)
        next_session: What to pick up next time (concrete, specific)
        diagram: Mermaid diagram body (just the content — no fences, no ```mermaid wrapper)
    """
    sf = _session_file_path(cwd)
    project = Path(cwd).name
    now = datetime.now().strftime("%H:%M")
    today = datetime.now().strftime("%Y-%m-%d")

    # Coerce list elements to str in case the model passes objects
    def _to_str(v) -> str:
        if isinstance(v, str):
            return v
        if isinstance(v, dict):
            return " — ".join(str(x) for x in v.values())
        return str(v)

    if discoveries:
        discoveries = [_to_str(d) for d in discoveries]
    if warnings:
        warnings = [_to_str(w) for w in warnings]
    if tips:
        tips = [_to_str(t) for t in tips]

    lines: list[str] = []

    # --- Section header ---
    lines.append(f"## {now} — {title}")
    lines.append("")
    lines.append(summary)
    lines.append("")

    # --- Work table ---
    if items:
        lines.append("| File / Thing | What |")
        lines.append("|:-------------|:-----|")
        for it in items:
            item_name = str(it.get("item", "")).strip()
            detail = str(it.get("detail", "")).strip()
            lines.append(f"| `{item_name}` | {detail} |")
        lines.append("")

    # --- Diagram ---
    if diagram:
        lines.append("```mermaid")
        lines.append(textwrap.dedent(diagram).strip())
        lines.append("```")
        lines.append("")

    # --- Discoveries ---
    if discoveries:
        for d in discoveries:
            lines.append("> [!info] Key Finding")
            for dline in textwrap.wrap(d, width=100):
                lines.append(f"> {dline}")
            lines.append("")

    # --- Warnings ---
    if warnings:
        for w in warnings:
            lines.append("> [!warning] Watch out")
            for wline in textwrap.wrap(w, width=100):
                lines.append(f"> {wline}")
            lines.append("")

    # --- Tips ---
    if tips:
        for t in tips:
            lines.append("> [!tip] Best Practice")
            for tline in textwrap.wrap(t, width=100):
                lines.append(f"> {tline}")
            lines.append("")

    # --- Next session ---
    if next_session:
        lines.append(f"**Next session:** {next_session}")
        lines.append("")

    block = "\n".join(lines)

    if not sf.exists():
        sf.parent.mkdir(parents=True, exist_ok=True)
        frontmatter = f"---\ntags: [{project}, session, {today}]\n---\n"
        header = f"# {project} — {today}\n"
        sf.write_text(frontmatter + header + "\n" + block)
        # Add index link to README
        readme = _project_note_path(cwd)
        if readme.exists():
            readme_text = readme.read_text(errors="replace")
            link = f"[[sessions/{today}]]"
            if link not in readme_text:
                entry = f"- {link} — {title}\n"
                if "## Sessions" in readme_text:
                    readme_text = readme_text.replace("## Sessions\n", f"## Sessions\n\n{entry}", 1)
                    readme_text = re.sub(r'\n{3,}', '\n\n', readme_text)
                else:
                    readme_text = readme_text.rstrip() + f"\n\n## Sessions\n\n{entry}"
                readme.write_text(readme_text)
    else:
        existing = sf.read_text(errors="replace")
        sf.write_text(existing.rstrip() + "\n\n" + block)
        # Update README index link to include title if it's a bare link
        readme = _project_note_path(cwd)
        if readme.exists():
            readme_text = readme.read_text(errors="replace")
            bare_link = f"[[sessions/{today}]]"
            aliased_link = f"[[sessions/{today}|{today} — {title}]]"
            # Replace bare link (not already aliased) with aliased version
            if bare_link in readme_text and aliased_link not in readme_text:
                readme_text = readme_text.replace(bare_link, aliased_link, 1)
                readme.write_text(readme_text)

    return f"Session logged → {sf.relative_to(VAULT_PATH)}"


@mcp.tool()
def save_knowledge(
    cwd: str,
    topic: str,
    summary: str,
    sections: list | None = None,
    items: list | None = None,
    discoveries: list | None = None,
    warnings: list | None = None,
    tips: list | None = None,
    questions: list | None = None,
    tasks: list | None = None,
    diagram: str | None = None,
    patterns: list | None = None,
) -> str:
    """Save or update a brain knowledge note for this project.
    Python generates proper Obsidian markdown — pass structured data, not raw markdown.

    Args:
        cwd: Absolute path of the working directory
        topic: Short name for this knowledge topic (e.g. "patterns", "files", "architecture")
        summary: 1-2 sentence description of what this note covers
        sections: List of {heading, content} dicts — main text sections.
                  content supports inline Obsidian markdown:
                  **bold**, *italic*, ==highlight==, `code`, [[wikilink]], [[Note|alias]]
        items: List of {item, detail} dicts — rendered as a table (file maps, routes, commands, packages)
        discoveries: List of strings — key insights → > [!info] Key Finding callouts (blue)
        warnings: List of strings — gotchas, constraints → > [!warning] Watch out callouts (orange)
        tips: List of strings — best practices, hints → > [!tip] callouts (cyan)
        questions: List of strings — open questions, unknowns → > [!question] callouts (yellow)
        tasks: List of strings — things to explore or verify → rendered as - [ ] task list
        diagram: Mermaid diagram body (content only — no fences, no ```mermaid wrapper).
                 Supports: flowchart/graph TD, sequenceDiagram, gitGraph, pie, gantt
        patterns: List of {name, language, code} dicts — labelled fenced code blocks
    """
    def _to_str(v) -> str:
        if isinstance(v, str):
            return v
        if isinstance(v, dict):
            return " — ".join(str(x) for x in v.values())
        return str(v)

    if discoveries:
        discoveries = [_to_str(d) for d in discoveries]
    if warnings:
        warnings = [_to_str(w) for w in warnings]
    if tips:
        tips = [_to_str(t) for t in tips]
    if questions:
        questions = [_to_str(q) for q in questions]
    if tasks:
        tasks = [_to_str(t) for t in tasks]

    project = Path(cwd).name
    slug = _slugify(topic)
    lines: list[str] = []

    # --- Title + summary ---
    lines.append(f"# {project} — {topic}")
    lines.append("")
    lines.append(summary)
    lines.append("")

    # --- Sections ---
    if sections:
        for sec in sections:
            heading = str(sec.get("heading", "")).strip()
            content = str(sec.get("content", "")).strip()
            if heading:
                lines.append(f"## {heading}")
                lines.append("")
            if content:
                lines.append(content)
                lines.append("")

    # --- Items table ---
    if items:
        lines.append("| Item | Detail |")
        lines.append("|:-----|:-------|")
        for it in items:
            item_name = str(it.get("item", "")).strip()
            detail = str(it.get("detail", "")).strip()
            lines.append(f"| `{item_name}` | {detail} |")
        lines.append("")

    # --- Diagram ---
    if diagram:
        lines.append("```mermaid")
        lines.append(textwrap.dedent(diagram).strip())
        lines.append("```")
        lines.append("")

    # --- Code patterns ---
    if patterns:
        for pat in patterns:
            name = str(pat.get("name", "")).strip()
            lang = str(pat.get("language", "")).strip() or "typescript"
            code = str(pat.get("code", "")).strip()
            if name:
                lines.append(f"### {name}")
                lines.append("")
            lines.append(f"```{lang}")
            lines.append(textwrap.dedent(code).strip())
            lines.append("```")
            lines.append("")

    # --- Discoveries ---
    if discoveries:
        for d in discoveries:
            lines.append("> [!info] Key Finding")
            for dline in textwrap.wrap(d, width=100):
                lines.append(f"> {dline}")
            lines.append("")

    # --- Tips ---
    if tips:
        for t in tips:
            lines.append("> [!tip] Best Practice")
            for tline in textwrap.wrap(t, width=100):
                lines.append(f"> {tline}")
            lines.append("")

    # --- Warnings ---
    if warnings:
        for w in warnings:
            lines.append("> [!warning] Watch out")
            for wline in textwrap.wrap(w, width=100):
                lines.append(f"> {wline}")
            lines.append("")

    # --- Open questions ---
    if questions:
        for q in questions:
            lines.append("> [!question] To Investigate")
            for qline in textwrap.wrap(q, width=100):
                lines.append(f"> {qline}")
            lines.append("")

    # --- Task list ---
    if tasks:
        lines.append("## To Do")
        lines.append("")
        for t in tasks:
            lines.append(f"- [ ] {t}")
        lines.append("")

    brain = _brain_dir(cwd)
    brain.mkdir(parents=True, exist_ok=True)
    p = brain / f"{slug}.md"
    fm = f"---\ntags: [{project}, brain, {slug}]\n---\n"
    p.write_text(fm + "\n".join(lines))
    return f"Brain updated → {p.relative_to(VAULT_PATH)}"


@mcp.tool()
def get_knowledge(cwd: str, topic: str = "") -> str:
    """Read a brain knowledge note for this project.

    Args:
        cwd: Absolute path of the working directory
        topic: Topic name to retrieve (leave empty to list all available topics)
    """
    if not topic:
        return list_knowledge(cwd)
    slug = _slugify(topic)
    p = _brain_dir(cwd) / f"{slug}.md"
    if not p.exists():
        return f"No brain note for topic '{topic}'. Use list_knowledge to see available topics."
    return p.read_text(errors="replace")


@mcp.tool()
def list_knowledge(cwd: str) -> str:
    """List all brain knowledge topics for this project.

    Args:
        cwd: Absolute path of the working directory
    """
    brain = _brain_dir(cwd)
    if not brain.exists():
        return "No brain notes yet. Use save_knowledge to start building the project brain."
    files = sorted(brain.glob("*.md"))
    if not files:
        return "No brain notes yet. Use save_knowledge to start building the project brain."
    rows = []
    for f in files:
        topic = f.stem
        content = f.read_text(errors="replace")
        _, body = _parse_frontmatter(content)
        first_line = next((l.strip() for l in body.splitlines() if l.strip() and not l.startswith('#')), "")
        heading = next((l.lstrip('#').strip() for l in body.splitlines() if l.startswith('#')), "")
        desc = heading or first_line or "—"
        rows.append(f"  {topic:<20} {desc[:70]}")
    header = f"Brain topics for {Path(cwd).name}:"
    return header + "\n" + "\n".join(rows)


@mcp.tool()
def set_next_steps(cwd: str, steps: str) -> str:
    """Update the Next Steps section of the project README.
    Call this at the end of a session so the next session knows what to pick up.

    Args:
        cwd: Absolute path of the working directory
        steps: Markdown list of next steps (will replace existing Next Steps section)
    """
    readme = _project_note_path(cwd)
    if not readme.exists():
        return f"No project README for '{Path(cwd).name}'. Run session_start first."
    existing = readme.read_text(errors="replace")
    updated = _update_section(existing, "## Next Steps", steps)
    readme.write_text(updated)
    return f"Next steps updated → {readme.relative_to(VAULT_PATH)}"


@mcp.tool()
def set_project_context(cwd: str, context: str) -> str:
    """Update the Context section of the project README (what this project is, stack, goals).

    Args:
        cwd: Absolute path of the working directory
        context: Markdown description of the project
    """
    readme = _project_note_path(cwd)
    if not readme.exists():
        return f"No project README for '{Path(cwd).name}'. Run session_start first."
    existing = readme.read_text(errors="replace")
    updated = _update_section(existing, "## Context", context)
    readme.write_text(updated)
    return f"Context updated → {readme.relative_to(VAULT_PATH)}"


# ---------------------------------------------------------------------------
# General vault tools
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
        name: Note path relative to vault root (e.g. "twin/Desktop/dev/sana/sessions/2026-05-05")
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
            tag_counts[t] = tag_counts.get(t) or 0
            tag_counts[t] += 1
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
