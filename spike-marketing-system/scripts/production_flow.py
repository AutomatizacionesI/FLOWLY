from __future__ import annotations

import argparse
import html
import json
import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo


ROOT = Path(__file__).resolve().parents[1]
PRODUCTION = ROOT / "workspace" / "content" / "production"
APPROVAL_QUEUE = ROOT / "workspace" / "content" / "approval-queue.md"
TEMPLATE_DIR = ROOT / "assets" / "post-template"
TIMEZONE = ZoneInfo("America/Montevideo")


def now_label() -> str:
    return datetime.now(TIMEZONE).isoformat(timespec="minutes")


def find_draft(piece_id: str) -> tuple[Path, str]:
    for path in (ROOT / "workspace" / "content" / "drafts").glob("*.md"):
        text = path.read_text(encoding="utf-8")
        if re.search(rf"Pieza:\s*{re.escape(piece_id)}\b", text, flags=re.I):
            return path, text
    raise SystemExit(f"No existe un borrador para {piece_id}.")


def field(text: str, name: str) -> str:
    match = re.search(rf"^-\s+\*\*{re.escape(name)}:\*\*\s*(.+)$", text, flags=re.M | re.I)
    return match.group(1).strip() if match else ""


def title_from(text: str, piece_id: str) -> str:
    match = re.search(r"^#\s+(.+)$", text, flags=re.M)
    return match.group(1).strip() if match else piece_id


def format_spec(text: str) -> tuple[str, int, int, int]:
    format_value = field(text, "Formato")
    if "reel" in format_value.lower() or "story" in format_value.lower():
        kind, width, height = "vertical", 1080, 1920
        total = 1
    else:
        kind, width, height = "carousel", 1080, 1350
        match = re.search(r"(\d+)\s+slides?", format_value, flags=re.I)
        total = int(match.group(1)) if match else 1
    return kind, width, height, total


def update_approval(piece_id: str, decision: str) -> None:
    lines = APPROVAL_QUEUE.read_text(encoding="utf-8").splitlines()
    found = False
    updated: list[str] = []
    for line in lines:
        if line.lstrip().startswith("|"):
            cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
            if cells and cells[0].lower() == piece_id.lower() and len(cells) >= 6:
                cells[-1] = decision
                line = "| " + " | ".join(cells) + " |"
                found = True
        updated.append(line)
    if not found:
        raise SystemExit(f"{piece_id} no está en la cola de aprobación.")
    APPROVAL_QUEUE.write_text("\n".join(updated) + "\n", encoding="utf-8")


def scaffold(piece_id: str) -> tuple[Path, dict[str, object]]:
    draft_path, text = find_draft(piece_id)
    piece_dir = PRODUCTION / piece_id
    manifest_path = piece_dir / "manifest.json"
    if manifest_path.exists():
        return piece_dir, json.loads(manifest_path.read_text(encoding="utf-8"))

    kind, width, height, total = format_spec(text)
    source_dir = piece_dir / "source"
    (piece_dir / "components").mkdir(parents=True, exist_ok=True)
    (piece_dir / "renders").mkdir(parents=True, exist_ok=True)
    source_dir.mkdir(parents=True, exist_ok=True)
    (source_dir / "shared.css").write_text((TEMPLATE_DIR / "shared.css").read_text(encoding="utf-8"), encoding="utf-8")
    html_template = (TEMPLATE_DIR / "slide.html").read_text(encoding="utf-8")
    title = title_from(text, piece_id)
    source_files: list[str] = []
    for number in range(1, total + 1):
        filename = f"slide-{number:02d}.html"
        rendered = (html_template.replace("{{ID}}", piece_id).replace("{{NUMBER}}", str(number))
                    .replace("{{TOTAL}}", str(total)).replace("{{EYEBROW}}", "Spike AI")
                    .replace("{{TITLE}}", html.escape(title if number == 1 else f"Slide {number}")))
        (source_dir / filename).write_text(rendered, encoding="utf-8")
        source_files.append(f"source/{filename}")

    manifest: dict[str, object] = {
        "id": piece_id,
        "title": title,
        "kind": kind,
        "width": width,
        "height": height,
        "version": 1,
        "stage": "produccion",
        "draft": draft_path.relative_to(ROOT).as_posix(),
        "source_files": source_files,
        "render_files": [],
        "editorial_approved_at": now_label(),
        "updated_at": now_label(),
    }
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (piece_dir / "review.md").write_text(f"# Historial de {piece_id}\n\n", encoding="utf-8")
    return piece_dir, manifest


def append_review(piece_dir: Path, event: str, notes: str) -> None:
    with (piece_dir / "review.md").open("a", encoding="utf-8", newline="\n") as handle:
        handle.write(f"## {now_label()} · {event}\n\n- Notas: {notes or 'sin notas'}\n\n")


def log_and_build(title: str, summary: str, files: str) -> None:
    subprocess.run([
        sys.executable, str(ROOT / "scripts" / "log_activity.py"),
        "--type", "aprobación", "--title", title, "--summary", summary, "--files", files,
    ], check=True)


def main() -> int:
    parser = argparse.ArgumentParser(description="Gestionar las dos aprobaciones de una pieza.")
    parser.add_argument("piece_id")
    parser.add_argument("event", choices=["approve-editorial", "submit-visual", "request-changes", "approve-visual"])
    parser.add_argument("--notes", default="")
    args = parser.parse_args()
    piece_id = args.piece_id.upper()

    if args.event == "approve-editorial":
        if (PRODUCTION / piece_id / "manifest.json").exists():
            raise SystemExit(f"{piece_id} ya tiene aprobación editorial y producción iniciada.")
        piece_dir, manifest = scaffold(piece_id)
        update_approval(piece_id, "aprobación editorial")
        append_review(piece_dir, "aprobación editorial", args.notes)
        title, summary = f"{piece_id} aprobado editorialmente", "Se habilitó la producción visual HTML/CSS; la pieza todavía requiere aprobación visual."
    else:
        piece_dir = PRODUCTION / piece_id
        manifest_path = piece_dir / "manifest.json"
        if not manifest_path.exists():
            raise SystemExit(f"{piece_id} todavía no tiene aprobación editorial ni carpeta de producción.")
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        current_stage = str(manifest.get("stage", "produccion"))
        renders = [piece_dir / str(path) for path in manifest.get("render_files", [])]
        if args.event in {"submit-visual", "approve-visual"} and (not renders or not all(path.is_file() for path in renders)):
            raise SystemExit("No se puede avanzar sin renders finales válidos.")
        if args.event == "submit-visual":
            if current_stage not in {"produccion", "cambios_visuales"}:
                raise SystemExit(f"No se puede enviar a revisión visual desde {current_stage}.")
            manifest["stage"] = "revision_visual"
            title, summary = f"{piece_id} enviado a revisión visual", "Los renders quedaron disponibles en el dashboard para decisión humana."
        elif args.event == "request-changes":
            if current_stage != "revision_visual":
                raise SystemExit("Los cambios visuales sólo pueden pedirse desde revision_visual.")
            if not args.notes.strip():
                raise SystemExit("Los cambios visuales requieren --notes.")
            manifest["stage"] = "cambios_visuales"
            title, summary = f"Cambios visuales solicitados en {piece_id}", args.notes.strip()
        else:
            if current_stage != "revision_visual":
                raise SystemExit("La aprobación visual sólo puede darse desde revision_visual.")
            manifest["stage"] = "lista_para_publicar"
            manifest["visual_approved_at"] = now_label()
            title, summary = f"{piece_id} aprobado visualmente", "La pieza quedó lista para publicar; no se publicó automáticamente."
        manifest["updated_at"] = now_label()
        manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        append_review(piece_dir, args.event, args.notes)

    log_and_build(title, summary, f"workspace/content/production/{piece_id}/; workspace/content/approval-queue.md")
    print(piece_dir)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
