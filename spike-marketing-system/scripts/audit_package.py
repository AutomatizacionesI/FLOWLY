from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
REQUIRED = [
    "SKILL.md",
    "agents/openai.yaml",
    "agents/orchestrator.md",
    "agents/researcher.md",
    "agents/strategist.md",
    "agents/creator.md",
    "agents/editor.md",
    "agents/designer.md",
    "agents/analyst.md",
    "references/business.md",
    "references/research-policy.md",
    "references/quality-gates.md",
    "references/production-workflow.md",
    "config/settings.yaml",
    "config/cadence.yaml",
    "workspace/current-state.md",
    "workspace/memory/decisions.md",
    "workspace/content/production/index.md",
    "ACTIVITY-LOG.md",
    "references/dashboard-protocol.md",
    "scripts/build_dashboard.py",
    "scripts/log_activity.py",
    "scripts/validate_dashboard.py",
    "scripts/production_flow.py",
    "scripts/render_post.py",
    "assets/post-template/shared.css",
    "assets/post-template/slide.html",
    "assets/dashboard-template.tpl",
    "ABRIR-DASHBOARD.html",
    "dashboard/index.html",
]


def main() -> int:
    errors: list[str] = []
    for relative in REQUIRED:
        if not (ROOT / relative).is_file():
            errors.append(f"Falta archivo requerido: {relative}")

    markdown_link = re.compile(r"\[[^\]]+\]\(([^)]+)\)")
    for path in ROOT.rglob("*.md"):
        contents = path.read_text(encoding="utf-8")
        for target in markdown_link.findall(contents):
            if target.startswith(("http://", "https://", "mailto:", "#")):
                continue
            clean_target = target.split("#", 1)[0].strip("<>")
            if clean_target and not (path.parent / clean_target).resolve().exists():
                errors.append(f"Enlace local roto en {path.relative_to(ROOT)}: {target}")

    if errors:
        print("AUDITORÍA FALLIDA")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Paquete válido: {ROOT}")
    print(f"Archivos Markdown: {sum(1 for _ in ROOT.rglob('*.md'))}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
