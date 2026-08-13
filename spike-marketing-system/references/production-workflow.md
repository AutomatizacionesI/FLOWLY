# Flujo de producción visual

## Estados

| Estado | Significado | Siguiente paso permitido |
|---|---|---|
| `revision_editorial` | Concepto y copy esperan decisión humana. | Aprobar editorialmente o pedir cambios. |
| `produccion` | Aprobación editorial registrada; se trabaja en HTML/CSS. | Renderizar y controlar. |
| `revision_visual` | Los renders finales están visibles en el dashboard. | Aprobar visualmente o pedir cambios. |
| `cambios_visuales` | Hay feedback humano pendiente de aplicar. | Corregir, rerenderizar y volver a revisión visual. |
| `lista_para_publicar` | Copy y visual final tienen aprobación humana. | Publicar manualmente o programar. |
| `publicada` | La publicación fue confirmada. | Registrar URL y métricas. |

No saltar estados. Una aprobación editorial no aprueba imágenes; una aprobación visual no publica automáticamente.

## Estructura por pieza

```text
workspace/content/production/CNT-000/
├── manifest.json
├── review.md
├── source/
│   ├── shared.css
│   └── slide-01.html
├── components/
└── renders/
    └── slide-01.png
```

- `manifest.json`: estado, formato, dimensiones, versión y lista de renders.
- `review.md`: historial append-only de aprobaciones y cambios.
- `source/`: fuente editable HTML/CSS.
- `components/`: imágenes o recursos auxiliares usados por la composición.
- `renders/`: archivos exactos que se revisan y eventualmente se publican.

## Comandos del flujo

- Aprobar editorialmente: `python scripts/production_flow.py CNT-001 approve-editorial`
- Enviar renders a revisión: `python scripts/production_flow.py CNT-001 submit-visual`
- Pedir cambios: `python scripts/production_flow.py CNT-001 request-changes --notes "..."`
- Aprobar visualmente: `python scripts/production_flow.py CNT-001 approve-visual`
- Renderizar: `python scripts/render_post.py CNT-001`

Cada transición actualiza el dashboard y queda registrada. Las decisiones se reciben por el chat; el dashboard es de lectura y revisión.

## Política de imágenes

Construir el post principalmente con tipografía, formas, grids, líneas, cards y diagramas en HTML/CSS. Usar generación de imágenes sólo para componentes que lo necesiten —por ejemplo una textura, ilustración o recorte— y guardar el resultado en `components/`. No convertir todo el diseño en una imagen generada porque impediría editar texto, jerarquía y layout con precisión.
