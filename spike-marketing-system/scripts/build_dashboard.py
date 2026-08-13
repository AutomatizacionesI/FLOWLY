from __future__ import annotations

import base64
import json
import re
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo


ROOT = Path(__file__).resolve().parents[1]
DASHBOARD_DIR = ROOT / "dashboard"
TEMPLATE_PATH = ROOT / "assets" / "dashboard-template.tpl"
OUTPUT_PATH = DASHBOARD_DIR / "index.html"
EASY_OUTPUT_PATH = ROOT / "ABRIR-DASHBOARD.html"
TIMEZONE = ZoneInfo("America/Montevideo")


def read(relative: str) -> str:
    path = ROOT / relative
    return path.read_text(encoding="utf-8") if path.exists() else ""


def clean_markdown(value: str) -> str:
    value = re.sub(r"<!--.*?-->", "", value, flags=re.S)
    value = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r"\1", value)
    value = value.replace("**", "").replace("`", "")
    return re.sub(r"\s+", " ", value).strip()


def excerpt(value: str, limit: int = 210) -> str:
    value = clean_markdown(value)
    if len(value) <= limit:
        return value
    return value[: limit - 1].rsplit(" ", 1)[0] + "…"


def parse_h2_sections(text: str) -> list[dict[str, str]]:
    matches = list(re.finditer(r"^##\s+(.+?)\s*$", text, flags=re.M))
    sections: list[dict[str, str]] = []
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        sections.append({"heading": match.group(1).strip(), "body": text[match.end():end].strip()})
    return sections


def parse_fields(body: str) -> dict[str, str]:
    fields: dict[str, str] = {}
    patterns = [
        re.compile(r"^-\s+\*\*(.+?):\*\*\s*(.*)$"),
        re.compile(r"^-\s+([^:*]+?):\s*(.*)$"),
    ]
    for line in body.splitlines():
        for pattern in patterns:
            match = pattern.match(line.strip())
            if match:
                fields[clean_markdown(match.group(1)).lower()] = clean_markdown(match.group(2))
                break
    return fields


def parse_table(text: str) -> list[dict[str, str]]:
    lines = [line.strip() for line in text.splitlines() if line.strip().startswith("|")]
    if len(lines) < 2:
        return []

    def cells(line: str) -> list[str]:
        return [clean_markdown(cell.strip()) for cell in line.strip("|").split("|")]

    header = cells(lines[0])
    rows: list[dict[str, str]] = []
    for line in lines[1:]:
        values = cells(line)
        if values and all(re.fullmatch(r":?-{3,}:?", value.replace(" ", "")) for value in values):
            continue
        if len(values) != len(header):
            continue
        rows.append(dict(zip(header, values)))
    return rows


def parse_activity() -> list[dict[str, str]]:
    entries: list[dict[str, str]] = []
    for section in parse_h2_sections(read("ACTIVITY-LOG.md")):
        parts = [part.strip() for part in section["heading"].split("·")]
        if len(parts) < 3 or not re.fullmatch(r"\d{4}-\d{2}-\d{2}", parts[0]):
            continue
        title_match = re.search(r"^###\s+(.+)$", section["body"], flags=re.M)
        fields = parse_fields(section["body"])
        entries.append({
            "date": parts[0],
            "time": parts[1],
            "type": parts[2],
            "title": clean_markdown(title_match.group(1)) if title_match else "Actividad",
            "summary": fields.get("resumen", ""),
            "files": fields.get("archivos", ""),
            "status": fields.get("estado", "completado"),
        })
    return list(reversed(entries))


def parse_research() -> list[dict[str, str]]:
    findings: list[dict[str, str]] = []
    for section in parse_h2_sections(read("workspace/research/inbox.md")):
        if not section["heading"].startswith("RES-"):
            continue
        identifier, _, title = section["heading"].partition(" — ")
        fields = parse_fields(section["body"])
        findings.append({
            "id": identifier,
            "title": title or identifier,
            "date": fields.get("fecha de consulta", ""),
            "source": fields.get("fuente", ""),
            "url": fields.get("url", ""),
            "evidence": fields.get("evidencia", ""),
            "implication": fields.get("inferencia para spike", fields.get("ángulo editorial", "")),
            "status": fields.get("estado", ""),
        })
    return list(reversed(findings))


def parse_cases() -> list[dict[str, str]]:
    cases: list[dict[str, str]] = []
    for section in parse_h2_sections(read("references/case-library.md")):
        if not section["heading"].startswith("CASE-"):
            continue
        identifier, _, title = section["heading"].partition(" — ")
        fields = parse_fields(section["body"])
        cases.append({
            "id": identifier,
            "title": title or identifier,
            "industry": fields.get("rubro comunicable", fields.get("rubros comunicables", "")),
            "problem": fields.get("problema", ""),
            "intervention": fields.get("intervención", ""),
            "result": fields.get("resultado aprobado", ""),
            "flow": fields.get("flujo", ""),
            "capabilities": fields.get("capacidades demostradas", ""),
            "angles": fields.get("ángulos posibles", ""),
            "path": "../references/case-library.md",
        })
    return cases


def parse_drafts() -> list[dict[str, str]]:
    drafts: list[dict[str, str]] = []
    for path in sorted((ROOT / "workspace/content/drafts").glob("*.md"), reverse=True):
        if path.name == "index.md":
            continue
        text = path.read_text(encoding="utf-8")
        title_match = re.search(r"^#\s+(.+)$", text, flags=re.M)
        piece_match = re.search(r"Pieza:\s*([^|]+)", text)
        brief = next((section for section in parse_h2_sections(text) if section["heading"] == "Brief"), None)
        fields = parse_fields(brief["body"] if brief else text)
        caption_match = re.search(r"^## Caption\s*$(.*?)(?=^##\s|\Z)", text, flags=re.M | re.S)
        drafts.append({
            "id": clean_markdown(piece_match.group(1)) if piece_match else path.stem,
            "title": clean_markdown(title_match.group(1)) if title_match else path.stem,
            "status": fields.get("estado", "borrador"),
            "objective": fields.get("objetivo", ""),
            "audience": fields.get("audiencia", ""),
            "pillar": fields.get("pilar", ""),
            "format": fields.get("formato", ""),
            "message": fields.get("mensaje único", ""),
            "cta": fields.get("cta", ""),
            "caption": excerpt(caption_match.group(1), 260) if caption_match else "",
            "document": text,
            "path": "../" + path.relative_to(ROOT).as_posix(),
        })
    return drafts


def parse_production() -> list[dict[str, object]]:
    items: list[dict[str, object]] = []
    production_dir = ROOT / "workspace" / "content" / "production"
    if not production_dir.exists():
        return items
    for manifest_path in sorted(production_dir.glob("*/manifest.json")):
        try:
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            continue
        piece_dir = manifest_path.parent
        renders: list[dict[str, str]] = []
        for relative in manifest.get("render_files", []):
            render_path = piece_dir / str(relative)
            if not render_path.is_file() or render_path.suffix.lower() != ".png":
                continue
            encoded = base64.b64encode(render_path.read_bytes()).decode("ascii")
            renders.append({"name": render_path.name, "data": f"data:image/png;base64,{encoded}"})
        items.append({
            "id": manifest.get("id", piece_dir.name),
            "title": manifest.get("title", piece_dir.name),
            "kind": manifest.get("kind", ""),
            "width": manifest.get("width", ""),
            "height": manifest.get("height", ""),
            "version": manifest.get("version", 1),
            "stage": manifest.get("stage", "produccion"),
            "updatedAt": manifest.get("updated_at", ""),
            "renders": renders,
        })
    return items


def parse_current_state() -> dict[str, str]:
    state: dict[str, str] = {}
    for line in read("workspace/current-state.md").splitlines():
        match = re.match(r"^-\s+([^:]+):\s*(.*)$", line.strip())
        if match:
            state[clean_markdown(match.group(1)).lower()] = clean_markdown(match.group(2))
    next_match = re.search(r"^## Próximo hito\s*$(.*?)(?=^##\s|\Z)", read("workspace/current-state.md"), flags=re.M | re.S)
    state["next"] = excerpt(next_match.group(1), 240) if next_match else ""
    return state


def build_data() -> dict[str, object]:
    now = datetime.now(TIMEZONE)
    activity = parse_activity()
    research = parse_research()
    drafts = parse_drafts()
    backlog = parse_table(read("workspace/content/backlog.md"))
    approvals = parse_table(read("workspace/content/approval-queue.md"))
    calendar = parse_table(read("workspace/content/calendar.md"))
    published = parse_table(read("workspace/content/published.md"))
    performance = parse_table(read("workspace/analytics/performance.md"))
    cases = parse_cases()
    production = parse_production()
    weekly_files = sorted((ROOT / "workspace/content").glob("*-weekly-plan.md"), reverse=True)
    weekly = parse_table(weekly_files[0].read_text(encoding="utf-8")) if weekly_files else []
    state = parse_current_state()
    pending_approvals = [row for row in approvals if row.get("Decisión", "").lower() in {"", "pendiente"}]
    selected_ideas = [row for row in backlog if row.get("Estado", "").lower() == "seleccionado"]

    return {
        "meta": {
            "generatedAt": now.isoformat(timespec="minutes"),
            "generatedLabel": now.strftime("%d/%m/%Y · %H:%M"),
            "today": now.date().isoformat(),
        },
        "state": state,
        "summary": {
            "pendingApprovals": len(pending_approvals),
            "ideas": len(backlog),
            "selectedIdeas": len(selected_ideas),
            "research": len(research),
            "drafts": len(drafts),
            "approved": len([d for d in drafts if "aprobado" in d["status"].lower()]),
            "published": len(published),
            "cases": len(cases),
            "production": len(production),
        },
        "activity": activity,
        "todayActivity": [item for item in activity if item["date"] == now.date().isoformat()],
        "research": research,
        "backlog": backlog,
        "approvals": approvals,
        "calendar": calendar,
        "weekly": weekly,
        "drafts": drafts,
        "published": published,
        "performance": performance,
        "cases": cases,
        "production": production,
    }


def main() -> int:
    template = TEMPLATE_PATH.read_text(encoding="utf-8")
    data = json.dumps(build_data(), ensure_ascii=False).replace("</", "<\\/")
    rendered = template.replace("__DASHBOARD_DATA__", data)
    DASHBOARD_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(rendered, encoding="utf-8")
    EASY_OUTPUT_PATH.write_text(rendered, encoding="utf-8")
    print(OUTPUT_PATH)
    print(EASY_OUTPUT_PATH)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
