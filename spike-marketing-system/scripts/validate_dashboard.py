from __future__ import annotations

import json
import re
import shutil
import subprocess
import sys
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
HTML_PATH = ROOT / "dashboard" / "index.html"
EASY_HTML_PATH = ROOT / "ABRIR-DASHBOARD.html"
REQUIRED_IDS = {
    "view-overview",
    "view-activity",
    "view-research",
    "view-ideas",
    "view-approvals",
    "view-production",
    "view-library",
    "view-calendar",
    "global-search",
    "dashboard-data",
    "detail-modal",
    "calendar-month",
    "calendar-prev",
    "calendar-next",
}


class DashboardParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.ids: set[str] = set()
        self.local_links: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        if attributes.get("id"):
            self.ids.add(str(attributes["id"]))
        href = attributes.get("href")
        if tag == "a" and href and href.startswith("../"):
            self.local_links.append(href)


def main() -> int:
    errors: list[str] = []
    if not HTML_PATH.is_file():
        print("Dashboard inexistente. Ejecutar build_dashboard.py.")
        return 1

    source = HTML_PATH.read_text(encoding="utf-8")
    if not EASY_HTML_PATH.is_file():
        errors.append("Falta el acceso directo ABRIR-DASHBOARD.html.")
    else:
        easy_source = EASY_HTML_PATH.read_text(encoding="utf-8")
        if "__DASHBOARD_DATA__" in easy_source:
            errors.append("El acceso directo conserva el placeholder de datos.")
        if easy_source != source:
            errors.append("El acceso directo no coincide con el dashboard generado.")
    if "__DASHBOARD_DATA__" in source:
        errors.append("El placeholder de datos no fue reemplazado.")
    if "Array.from({length:42}" not in source:
        errors.append("El calendario no contiene la vista mensual completa.")
    if "data-open-draft" not in source or "data-open-case" not in source:
        errors.append("Faltan las aperturas internas de piezas o casos.")
    if "data-open-idea" not in source:
        errors.append("Las ideas no tienen apertura de detalle.")
    if 'class="event" data-open-draft' not in source:
        errors.append("Los eventos del calendario no abren sus piezas.")
    if "Visuales · ${renders.length} slides" not in source:
        errors.append("El detalle editorial no incorpora los renders visuales.")
    if "data.todayActivity:data.activity).slice(0,6)" not in source:
        errors.append("El resumen no limita la actividad reciente a seis entradas.")

    parser = DashboardParser()
    parser.feed(source)
    missing_ids = REQUIRED_IDS - parser.ids
    if missing_ids:
        errors.append("Faltan secciones: " + ", ".join(sorted(missing_ids)))

    data_match = re.search(
        r'<script id="dashboard-data" type="application/json">(.*?)</script>',
        source,
        flags=re.S,
    )
    if not data_match:
        errors.append("No se encontró el bloque de datos.")
        data: dict[str, object] = {}
    else:
        try:
            data = json.loads(data_match.group(1))
        except json.JSONDecodeError as exc:
            errors.append(f"JSON inválido: {exc}")
            data = {}

    for key in ("summary", "activity", "research", "backlog", "approvals", "production", "calendar", "drafts", "cases"):
        if key not in data:
            errors.append(f"Falta la colección de datos: {key}")

    for href in parser.local_links:
        resolved = (HTML_PATH.parent / href).resolve()
        if not resolved.exists():
            errors.append(f"Enlace local roto: {href}")

    scripts = re.findall(r"<script(?:\s[^>]*)?>(.*?)</script>", source, flags=re.S)
    application_scripts = [script for script in scripts if "function render()" in script and "dashboard-data" in script]
    node = shutil.which("node")
    if node and application_scripts:
        result = subprocess.run(
            [node, "--check", "-"],
            input=application_scripts[-1],
            text=True,
            encoding="utf-8",
            capture_output=True,
            check=False,
        )
        if result.returncode:
            errors.append("JavaScript inválido: " + result.stderr.strip())
    elif not application_scripts:
        errors.append("No se encontró el JavaScript de la interfaz.")

    if errors:
        print("VALIDACIÓN DEL DASHBOARD FALLIDA")
        for error in errors:
            print(f"- {error}")
        return 1

    summary = data.get("summary", {})
    print("Dashboard válido")
    print(f"Actividad: {len(data.get('activity', []))}")
    print(f"Ideas: {summary.get('ideas', 0)}")
    print(f"Piezas por aprobar: {summary.get('pendingApprovals', 0)}")
    print(f"Casos: {summary.get('cases', 0)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
