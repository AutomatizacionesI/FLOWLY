from __future__ import annotations

import argparse
import json
import shutil
import struct
import subprocess
import sys
import tempfile
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo


ROOT = Path(__file__).resolve().parents[1]
TIMEZONE = ZoneInfo("America/Montevideo")


def find_browser() -> Path:
    candidates = [
        shutil.which("msedge"), shutil.which("chrome"), shutil.which("chromium"),
        Path("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"),
        Path("C:/Program Files/Microsoft/Edge/Application/msedge.exe"),
        Path("C:/Program Files/Google/Chrome/Application/chrome.exe"),
    ]
    for candidate in candidates:
        if candidate and Path(candidate).is_file():
            return Path(candidate)
    raise SystemExit("No se encontró Edge, Chrome o Chromium para renderizar.")


def png_size(path: Path) -> tuple[int, int]:
    with path.open("rb") as handle:
        if handle.read(8) != b"\x89PNG\r\n\x1a\n":
            raise ValueError(f"Render inválido: {path}")
        length = struct.unpack(">I", handle.read(4))[0]
        chunk = handle.read(4)
        if chunk != b"IHDR" or length < 8:
            raise ValueError(f"PNG sin cabecera válida: {path}")
        return struct.unpack(">II", handle.read(8))


def main() -> int:
    parser = argparse.ArgumentParser(description="Renderizar una pieza HTML/CSS a PNG.")
    parser.add_argument("piece_id")
    args = parser.parse_args()
    piece_id = args.piece_id.upper()
    piece_dir = ROOT / "workspace" / "content" / "production" / piece_id
    manifest_path = piece_dir / "manifest.json"
    if not manifest_path.is_file():
        raise SystemExit(f"No existe producción para {piece_id}.")
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    width, height = int(manifest["width"]), int(manifest["height"])
    browser = find_browser()
    render_dir = piece_dir / "renders"
    render_dir.mkdir(parents=True, exist_ok=True)
    profile = Path(tempfile.mkdtemp(prefix=f".render-{piece_id}-", dir=piece_dir))
    render_files: list[str] = []
    try:
        for relative in manifest.get("source_files", []):
            source = piece_dir / str(relative)
            if not source.is_file():
                raise SystemExit(f"Falta fuente: {relative}")
            output = render_dir / (source.stem + ".png")
            command = [
                str(browser), "--headless=new", "--disable-gpu", "--disable-crash-reporter",
                "--no-first-run", "--allow-file-access-from-files", "--force-device-scale-factor=1",
                f"--user-data-dir={profile}", f"--window-size={width},{height}",
                f"--screenshot={output}", source.resolve().as_uri(),
            ]
            result = subprocess.run(command, capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=45)
            if result.returncode or not output.is_file():
                raise SystemExit(f"Falló el render de {source.name}: {result.stderr.strip()}")
            actual = png_size(output)
            if actual != (width, height):
                raise SystemExit(f"Dimensión incorrecta en {output.name}: {actual}, esperada {(width, height)}")
            render_files.append(output.relative_to(piece_dir).as_posix())
    finally:
        shutil.rmtree(profile, ignore_errors=True)

    manifest["render_files"] = render_files
    manifest["rendered_at"] = datetime.now(TIMEZONE).isoformat(timespec="minutes")
    manifest["updated_at"] = manifest["rendered_at"]
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    subprocess.run([sys.executable, str(ROOT / "scripts" / "log_activity.py"), "--type", "contenido",
                    "--title", f"Renders generados para {piece_id}",
                    "--summary", f"Se generaron y validaron {len(render_files)} archivos PNG desde fuentes HTML/CSS.",
                    "--files", f"workspace/content/production/{piece_id}/"], check=True)
    for relative in render_files:
        print(piece_dir / relative)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
