# Portabilidad

La carpeta `spike-marketing-system` es autocontenida. Puede copiarse o moverse completa.

## Formas de uso

- **Dentro de un proyecto:** abrir o indicar esta carpeta al agente. `AGENTS.md` dirige el trabajo a `SKILL.md`.
- **Como skill de Codex:** copiar la carpeta completa al directorio personal de skills y reiniciar/recargar la sesión. Invocarla como `$spike-marketing-system`.
- **En otro sistema de agentes:** usar `SKILL.md` como prompt orquestador y conservar las rutas relativas de la carpeta.

No mover archivos internos por separado: las instrucciones utilizan rutas relativas para conservar contexto, memoria y flujos.

## Dashboard local

Abrir `ABRIR-DASHBOARD.html` con doble clic. Es una vista de sólo lectura y funciona sin servidor ni dependencias externas.

Después de mover la carpeta o cambiar contenido manualmente, ejecutar `scripts/build_dashboard.py` para refrescarla. El agente debe usar `scripts/log_activity.py` al cerrar cada ciclo; ese comando agrega la actividad y regenera el dashboard automáticamente.

Las producciones viajan completas dentro de `workspace/content/production/`: fuentes HTML/CSS, componentes, renders e historial de revisión. En otra computadora, el render requiere Edge, Chrome o Chromium instalado; la revisión de renders existentes funciona sin esa dependencia.

## Dependencias externas opcionales

- Acceso web para investigación actual.
- Landing de Spike AI como referencia de sólo lectura.
- Edge, Chrome o Chromium para renderizar las fuentes HTML/CSS a PNG.
- Herramienta de generación visual opcional para crear componentes gráficos puntuales; no es necesaria para componer el post completo.
- Programador externo para ejecutar rutinas en horarios definidos.
- Datos manuales o exportados de Instagram para análisis.

Sin estas dependencias, el sistema conserva identidad, procesos, memoria, plantillas y capacidad de producir borradores. La programación automática no viaja dentro de una carpeta: debe configurarse nuevamente en el entorno de destino usando los archivos de `automation/` y `config/cadence.yaml`.
