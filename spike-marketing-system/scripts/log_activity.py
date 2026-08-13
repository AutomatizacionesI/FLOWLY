from __future__ import annotations

import argparse
import subprocess
import sys
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo


ROOT = Path(__file__).resolve().parents[1]
LOG_PATH = ROOT / "ACTIVITY-LOG.md"
BUILD_SCRIPT = ROOT / "scripts" / "build_dashboard.py"
TIMEZONE = ZoneInfo("America/Montevideo")


def main() -> int:
    parser = argparse.ArgumentParser(description="Agregar actividad y refrescar el dashboard.")
    parser.add_argument("--type", required=True)
    parser.add_argument("--title", required=True)
    parser.add_argument("--summary", required=True)
    parser.add_argument("--files", default="")
    parser.add_argument("--status", default="completado")
    args = parser.parse_args()

    now = datetime.now(TIMEZONE)
    entry = (
        f"\n## {now:%Y-%m-%d} · {now:%H:%M} · {args.type.strip()}\n\n"
        f"### {args.title.strip()}\n\n"
        f"- **Resumen:** {args.summary.strip()}\n"
        f"- **Archivos:** {args.files.strip() or 'sin archivos'}\n"
        f"- **Estado:** {args.status.strip()}\n"
    )
    with LOG_PATH.open("a", encoding="utf-8", newline="\n") as handle:
        handle.write(entry)

    subprocess.run([sys.executable, str(BUILD_SCRIPT)], check=True)
    print(LOG_PATH)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

