# Biblioteca de patrones visuales

Referencia operativa para elegir componentes con significado. No es una galería de adornos ni una colección de plantillas para copiar.

## Regla de selección

Antes de crear un componente, definir:

1. Qué relación debe explicar.
2. Qué parte se lee primero.
3. Qué elemento cambia o avanza.
4. Qué se puede eliminar sin perder significado.
5. Cómo se ve a tamaño miniatura.

Si no existe una relación clara, usar tipografía, espacio y reglas en lugar de un diagrama.

## Búsqueda externa condicional

Buscar referencias en internet sólo cuando el componente explique una relación real y la biblioteca interna no tenga un patrón suficientemente probado. Priorizar sistemas de diseño oficiales, documentación del componente y ejemplos implementados; evitar galerías de inspiración sin especificaciones.

La búsqueda debe servir para estudiar anatomía, espaciado, alineación y estados. No copiar la estética de otra marca ni incorporar código, íconos o recursos externos sin comprobar licencia, portabilidad y aporte real.

Registrar la fuente consultada y qué regla concreta se adoptó. Si la referencia no mejora la claridad, descartarla.

## Proceso lineal de tres o más pasos

**Usar para:** entrada → ejecución → control; diagnóstico → preparación → implementación.

**Anatomía aprobada:**

- una línea continua de progreso;
- pasos alineados horizontal o verticalmente;
- etiquetas de uno o dos conceptos;
- texto de apoyo breve;
- un único estado activo o énfasis funcional.

**Evitar:** puntos flotantes, líneas que no conectan exactamente, círculos decorativos repetidos y estados de colores distintos sin significado.

**Carril del conector:** si existe una línea o flecha, debe tener un carril propio y separado del texto, divisores y marcadores. Ningún conector puede cruzar, tocar por accidente o competir con otro trazo. Si no se puede garantizar, eliminar el conector y sostener la secuencia con orden, grilla y etiquetas.

**Referencia estudiada:** IBM Carbon Design System, *Progress indicator*. Carbon recomienda este patrón para procesos lineales de tres o más pasos y señala que la alineación vertical suele facilitar la lectura.

- https://carbondesignsystem.com/components/progress-indicator/usage/
- https://www.designsystem.tech.gov.sg/components/stepper

## Documento anotado

**Usar para:** revisión, validación, objeciones, datos faltantes o errores.

**Anatomía aprobada:** un documento reconocible, un máximo de tres anotaciones, líneas de conexión precisas y una sola convención de marcado.

**Evitar:** múltiples cards flotantes, sombras decorativas o resaltados que no correspondan a la observación.

## Comparación

**Usar para:** antes/después, opción A/B, con/sin criterio.

**Anatomía aprobada:** dos campos equivalentes, un solo eje comparativo y diferencias explícitas.

**Evitar:** usar colores distintos como única explicación o comparar listas con estructuras diferentes.

## Indicador o escala

**Usar para:** riesgo, claridad, esfuerzo, impacto o madurez cuando la posición relativa aporta significado.

**Anatomía aprobada:** eje común, etiquetas consistentes, marcador legible y explicación de qué significa avanzar.

**Evitar:** precisión numérica inventada, sliders que parecen interactivos o marcadores verdes sin interpretación.

## Jerarquía tipográfica

**Usar para:** ideas abstractas, principios, conclusiones y puntos de vista.

**Anatomía aprobada:** titular dominante, palabra o frase de contraste y un solo gesto visual ligado al mensaje.

**Evitar:** convertir cada concepto en una card o agregar ilustraciones sin función.

## Revisión obligatoria

- Ver a 1080×1350 y como miniatura de aproximadamente 270×338.
- Confirmar alineaciones, conexiones y respiración.
- Quitar el verde temporalmente: si no se entiende qué función cumplía, eliminarlo.
- Comparar con el patrón de referencia por anatomía, no por estilo.
- Rechazar el componente si compite con el titular o parece más genérico que el contenido.
- Revisar cada borde, flecha, pseudo-elemento y línea en las uniones: no puede haber solapamientos, dobles trazos, cortes, salientes ni cruces involuntarios.
- Hacer al menos un ciclo `render → inspección → ajuste → nuevo render`; el primer render nunca se envía directamente a aprobación si contiene componentes geométricos.
- Cuando un componente falle dos veces, simplificarlo o reemplazarlo por jerarquía tipográfica antes de intentar una tercera ornamentación.
