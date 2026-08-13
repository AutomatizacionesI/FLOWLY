from __future__ import annotations

import argparse
import re
from datetime import date
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
TEMPLATES = {
    "carousel": ROOT / "templates" / "carousel.md",
    "reel": ROOT / "templates" / "reel.md",
    "brief": ROOT / "templates" / "content-brief.md",
}


def slugify(value: str) -> str:
    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9áéíóúüñ]+", "-", value)
    return value.strip("-") or "borrador"


def main() -> int:
    parser = argparse.ArgumentParser(description="Crear un borrador desde una plantilla.")
    parser.add_argument("kind", choices=sorted(TEMPLATES))
    parser.add_argument("title")
    parser.add_argument("--date", default=date.today().isoformat())
    args = parser.parse_args()

    output_dir = ROOT / "workspace" / "content" / "drafts"
    output_dir.mkdir(parents=True, exist_ok=True)
    output = output_dir / f"{args.date}-{slugify(args.title)}.md"
    if output.exists():
        raise SystemExit(f"El borrador ya existe: {output}")

    template = TEMPLATES[args.kind].read_text(encoding="utf-8")
    output.write_text(f"<!-- Título: {args.title} -->\n\n{template}", encoding="utf-8")
    print(output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

