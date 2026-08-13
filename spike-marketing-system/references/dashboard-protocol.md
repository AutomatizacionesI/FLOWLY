# Protocolo de dashboard y actividad

## Regla de cierre

Antes de terminar cualquier ejecución que cambie el sistema:

1. Agregar una entrada a `ACTIVITY-LOG.md` usando `scripts/log_activity.py`.
2. Regenerar `dashboard/index.html` y `ABRIR-DASHBOARD.html` con `scripts/build_dashboard.py`.
3. Confirmar que la auditoría del paquete pasa.

## Activity log

Mantenerlo append-only. Registrar una acción útil para el usuario, no cada operación técnica. Usar tipos breves: `investigación`, `estrategia`, `contenido`, `aprobación`, `publicación`, `analítica`, `sistema` o `bloqueo`.

Cada entrada debe incluir fecha/hora, título, resumen, archivos relevantes y estado. Si una acción corrige otra, agregar una nueva entrada y referenciar la anterior.

## Dashboard

El dashboard es una vista generada, no una fuente de verdad. El acceso humano recomendado es `ABRIR-DASHBOARD.html`. No editar ese archivo ni `dashboard/index.html` a mano: modificar los archivos fuente o `assets/dashboard-template.tpl` y regenerar.

Los botones de aprobación sólo copian mensajes para el agente. No cambian estados ni escriben archivos.

La sección `Producción` muestra el estado visual y embebe los renders PNG generados desde HTML/CSS. Una pieza entra allí después de la aprobación editorial y sólo pasa a lista para publicar mediante aprobación visual explícita.
