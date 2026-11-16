import type { Pagina } from "../tipos"

export const casos: Pagina[] = [
  {
    ruta: "/casos/lunar-vintage/",
    tipo: "caso",
    titulo: "Lunar Vintage: tienda online con panel propio para ropa de segunda mano",
    tituloSeo: "Lunar Vintage: tienda online con panel propio",
    descripcion:
      "Cómo construimos la tienda online de Lunar Vintage: catálogo por rubros, venta cerrada por WhatsApp y un panel para cargar productos y ver márgenes.",
    etiqueta: "Retail · Ropa vintage",
    entrada:
      "Lunar Vintage vende ropa, accesorios y libros de segunda mano, con curaduría propia. Necesitaban una vitrina online que reflejara esa identidad y un panel que las dueñas pudieran manejar solas desde el celular.",
    cliente: { nombre: "Lunar Vintage", url: "https://www.lunarvintagee.com/" },
    secciones: [
      {
        titulo: "El punto de partida",
        parrafos: [
          "Lunar trabajaba con vendedoras que dejan sus prendas y se queda con un margen por cada venta. Mostraban todo por Instagram y cerraban cada compra por WhatsApp. Funcionaba, pero no había un catálogo ordenado al que mandar a una clienta ni un lugar donde ver cuánto valía el stock y cuánto ganaba el negocio.",
          "El pedido era concreto: una web con carácter propio, sin pagos complicados, que se pudiera mantener sin saber programar.",
        ],
      },
      {
        titulo: "Qué construimos",
        parrafos: [
          "Una tienda online hecha a medida, con un catálogo organizado por rubros y subcategorías, y una ficha por producto con galería de fotos y un botón directo a WhatsApp para cerrar la compra.",
          "Del lado de las dueñas, un panel de administración propio:",
        ],
        puntos: [
          "Alta y edición de productos, con fotos que se reordenan arrastrando.",
          "Subida de fotos desde el celular, con compresión automática para que la web siga liviana.",
          "Activar o desactivar productos en un clic.",
          "Métricas de stock y una calculadora de margen de consignación editable, para probar distintos repartos con las vendedoras.",
        ],
      },
      {
        titulo: "Cómo trabajamos",
        parrafos: [
          "Arrancamos con una primera versión rápida y la fuimos ajustando en rondas cortas, con feedback directo de las dueñas. Cada ronda cerraba definiciones concretas: estructura del catálogo, estilo, métricas que querían ver.",
          "Después de la publicación seguimos con ajustes finos: preguntas frecuentes, manejo de fotos desde distintos celulares y mejoras de velocidad.",
        ],
      },
      {
        titulo: "Qué cambió",
        parrafos: [
          "Lunar pasó de mostrar productos suelta en redes a tener una tienda propia, ordenada, con su identidad y con un panel que manejan ellas. Cargar y actualizar el catálogo dejó de depender de nadie más, y el margen de cada rubro está a la vista.",
          "La web sigue en producción y es la base sobre la que se piensa lo que viene.",
        ],
      },
      {
        titulo: "Para quién sirve algo así",
        parrafos: [
          "Para marcas y emprendimientos de moda, objetos de segunda mano o productos únicos que venden por redes y necesitan una vitrina propia y un panel simple, sin armar una tienda con pagos online desde el día uno.",
        ],
      },
    ],
    relacionadas: [
      "/servicios/plataformas-web-y-tiendas-online/",
      "/industrias/retail-y-ecommerce/",
      "/casos/redress/",
    ],
    resumen:
      "Tienda online a medida para una marca de ropa de segunda mano, con catálogo por rubros, cierre por WhatsApp y panel de administración propio.",
  },
  {
    ruta: "/casos/redress/",
    tipo: "caso",
    titulo: "ReDress: plataforma de alquiler de vestidos con reservas y turnos",
    tituloSeo: "ReDress: plataforma de alquiler de vestidos",
    descripcion:
      "Construimos para ReDress una plataforma de alquiler de vestidos con calendario de disponibilidad, reservas, turnos de showroom y panel de administración.",
    etiqueta: "Retail · Alquiler de moda",
    entrada:
      "ReDress alquila vestidos de fiesta por noche. Reemplazamos una operación que vivía en WhatsApp e Instagram por una plataforma con catálogo, disponibilidad real, reservas, turnos y un panel para gestionarlo todo.",
    cliente: { nombre: "ReDress", url: "https://www.redress.com.uy/" },
    secciones: [
      {
        titulo: "El punto de partida",
        parrafos: [
          "Las prendas son de propietarias que las dejan en consignación, y ReDress se queda con una comisión de cada alquiler. Disponibilidad, reservas, turnos para probarse en el showroom y la liquidación a propietarias se manejaban a mano, por mensajes.",
          "Con ese esquema había riesgo de doble reserva, mucho tiempo perdido contestando lo mismo y ningún registro ordenado de lo que le correspondía a cada propietaria.",
        ],
      },
      {
        titulo: "Qué construimos",
        parrafos: [
          "Un sitio público y un panel de administración conectados entre sí. Las clientas ven el catálogo con filtros, consultan en un calendario si el vestido está libre, piden la reserva y sacan turno para el showroom. Las administradoras gestionan todo desde un solo lugar.",
        ],
        puntos: [
          "Motor de disponibilidad por fechas, con días de margen antes y después de cada alquiler.",
          "Reservas con estados claros: pendiente, confirmada, cancelada.",
          "Turnos de showroom con capacidad por bloque horario.",
          "Inventario con fotos, bloqueos manuales y estados por prenda.",
          "Informe de liquidación por propietaria, listo para imprimir.",
        ],
      },
      {
        titulo: "Cómo trabajamos",
        parrafos: [
          "Definimos el alcance en reuniones con las dueñas y lo dividimos en etapas: primero las reglas del negocio, después el frente público, el panel y por último la puesta en producción. Les mostramos un primer pantallazo temprano para ajustar antes de seguir.",
          "Las reglas que todavía no estaban cerradas, como los márgenes o las condiciones del showroom, quedaron editables desde el panel para poder cambiarlas sin tocar código.",
        ],
      },
      {
        titulo: "Qué cambió",
        parrafos: [
          "Disponibilidad, reservas y turnos pasaron de los chats a un sistema que no se pisa. La disponibilidad que ve la clienta es la real, y las dueñas saben en todo momento qué se alquiló, qué está pendiente y cuánto corresponde a cada propietaria.",
        ],
      },
      {
        titulo: "Para quién sirve algo así",
        parrafos: [
          "Para cualquier negocio que alquile objetos únicos o trabaje con citas: ropa, equipos, salones, showrooms. Si hoy coordinás disponibilidad por WhatsApp, un sistema a medida te ahorra errores y horas.",
        ],
      },
    ],
    relacionadas: [
      "/servicios/sistemas-a-medida/",
      "/industrias/retail-y-ecommerce/",
      "/casos/lunar-vintage/",
    ],
    resumen:
      "Plataforma a medida para alquilar vestidos por noche, con disponibilidad en calendario, reservas, turnos de showroom y liquidación a propietarias.",
  },
  {
    ruta: "/casos/hike/",
    tipo: "caso",
    titulo: "HIKE: sitio de marca para termos con catálogo por líneas y colores",
    tituloSeo: "HIKE: sitio de marca con catálogo por líneas",
    descripcion:
      "El sitio de HIKE, marca uruguaya de termos: catálogo por líneas con variantes de color, productos agotados, descuentos y contacto directo por WhatsApp.",
    etiqueta: "Retail · Productos de consumo",
    entrada:
      "HIKE es una marca uruguaya de termos y accesorios. Les armamos un sitio liviano y claro, con su catálogo completo y la compra resuelta por WhatsApp.",
    cliente: { nombre: "HIKE", url: "https://hike.house/" },
    secciones: [
      {
        titulo: "El punto de partida",
        parrafos: [
          "HIKE tiene varias líneas de termos, vasos y billeteras, cada una con distintas variantes de color. Necesitaban un lugar donde mostrar todo ordenado, con la identidad de la marca, y que la gente pudiera pasar de mirar a consultar sin vueltas.",
        ],
      },
      {
        titulo: "Qué construimos",
        parrafos: [
          "Un sitio de una sola página, rápido y pensado para el celular, que presenta la marca y todo el catálogo.",
        ],
        puntos: [
          "Productos agrupados por línea, con variantes de color y una segunda foto.",
          "Estado de agotado por producto o por color.",
          "Precios con descuento cuando hay promociones.",
          "Comparativa entre productos, preguntas frecuentes y sección sobre la marca.",
          "Contacto y compra directa por WhatsApp.",
        ],
      },
      {
        titulo: "Cómo trabajamos",
        parrafos: [
          "Fue un proyecto corto y directo. Publicamos una primera versión, y después fuimos sumando lo que la marca iba necesitando: marcar productos agotados, cargar descuentos y optimizar las imágenes para que el sitio cargue rápido en cualquier conexión.",
        ],
      },
      {
        titulo: "Qué cambió",
        parrafos: [
          "HIKE pasó a tener una vitrina propia, consistente con la marca, donde cada línea y cada color se ven en un solo lugar. Quien llega con interés tiene un camino corto hasta la consulta, y la marca controla cómo se presenta.",
        ],
      },
      {
        titulo: "Para quién sirve algo así",
        parrafos: [
          "Para marcas chicas con un catálogo acotado que necesitan presencia profesional y un canal de venta simple, sin invertir de entrada en una tienda online completa. Si más adelante necesitás pedidos, stock o un panel, el sitio puede crecer hacia eso.",
        ],
      },
    ],
    relacionadas: [
      "/servicios/plataformas-web-y-tiendas-online/",
      "/industrias/retail-y-ecommerce/",
      "/casos/lunar-vintage/",
    ],
    resumen:
      "Sitio de marca liviano para una empresa de termos, con catálogo por líneas y colores, estados de agotado, descuentos y contacto por WhatsApp.",
  },
  {
    ruta: "/casos/sistema-gestion-alquileres-inmobiliaria/",
    tipo: "caso",
    titulo: "Sistema de gestión de alquileres para una inmobiliaria",
    tituloSeo: "Sistema de gestión de alquileres para inmobiliarias",
    descripcion:
      "Un sistema propio que reúne propiedades, contratos, vencimientos y tareas de una inmobiliaria, conectado a su sistema contable y con automatizaciones.",
    etiqueta: "Inmobiliarias",
    entrada:
      "Una administradora de alquileres tenía la operación repartida entre planillas, mensajes y la memoria de su equipo. Construimos un sistema propio que junta todo en un lugar.",
    secciones: [
      {
        titulo: "El punto de partida",
        parrafos: [
          "La información de cada unidad estaba dispersa: quién es el propietario, quién el inquilino, qué dice el contrato, cuándo vence, qué reclamos de mantenimiento hay abiertos. Para responder una consulta había que buscar en varios lugares y confiar en que alguien se acordara.",
          "La inmobiliaria ya contaba con un sistema contable que funcionaba bien para lo suyo. El problema era la capa operativa que quedaba alrededor.",
        ],
      },
      {
        titulo: "Qué construimos",
        parrafos: [
          "Una aplicación web con acceso por usuario y permisos por sección, donde desde una sola pantalla se ve el contexto completo de cada unidad. En lugar de reemplazar el sistema contable, la construimos encima: lee de él los datos maestros y agrega lo que ese sistema no hace.",
        ],
        puntos: [
          "Inventario de edificios, unidades, propietarios e inquilinos.",
          "Contratos con asistente de alta, checklist y generación de documentos desde plantillas editables.",
          "Seguimiento de mantenimiento, puesta a punto de unidades y comunicaciones.",
          "Calendario, búsqueda e informes.",
          "Alertas y automatizaciones para las tareas repetitivas.",
        ],
      },
      {
        titulo: "Cómo trabajamos",
        parrafos: [
          "Fuimos por módulos, empezando por lo que el equipo usaba todos los días y sumando el resto a medida que se necesitaba. La conexión con el sistema contable es de solo lectura, para que nunca se pueda alterar el sistema central por error.",
        ],
      },
      {
        titulo: "Qué cambió",
        parrafos: [
          "El equipo comercial y el operativo trabajan sobre la misma información. Hay menos seguimiento manual, los vencimientos no dependen de la memoria de nadie y cualquier consulta sobre una unidad se resuelve en una sola pantalla.",
        ],
      },
      {
        titulo: "Para quién sirve algo así",
        parrafos: [
          "Para inmobiliarias y administradoras que ya tienen un sistema contable y planillas por todos lados, y necesitan una capa operativa propia sin tener que migrar todo lo que ya funciona.",
        ],
      },
    ],
    relacionadas: [
      "/industrias/inmobiliarias/",
      "/servicios/sistemas-a-medida/",
      "/casos/ia-conectada-base-inmobiliaria/",
    ],
    resumen:
      "Sistema web que centraliza propiedades, contratos, vencimientos y tareas de una inmobiliaria, montado sobre su sistema contable.",
  },
  {
    ruta: "/casos/ia-conectada-base-inmobiliaria/",
    tipo: "caso",
    titulo: "IA conectada a la base de una inmobiliaria para asistir al equipo",
    tituloSeo: "IA conectada a la base de datos de una inmobiliaria",
    descripcion:
      "Conectamos una IA a la base operativa de una inmobiliaria para que el equipo consulte datos reales, dispare acciones y trabaje sin cambiar su rutina.",
    etiqueta: "Inmobiliarias · IA",
    entrada:
      "Una inmobiliaria tenía toda su información en una base de datos, pero acceder a ella dependía de pocas personas. Conectamos una IA a esa base para que cualquiera del equipo consulte y actúe.",
    secciones: [
      {
        titulo: "El punto de partida",
        parrafos: [
          "Las preguntas del día a día, como en qué estado está un contrato o qué unidades tienen algo pendiente, se respondían abriendo pantallas, pidiéndole el dato a un colega o armando una consulta aparte. La información existía, pero llegar a ella costaba tiempo.",
        ],
      },
      {
        titulo: "Qué construimos",
        parrafos: [
          "Un asistente de IA conectado a la base operativa, con acceso controlado a los datos que corresponden. El equipo pregunta en lenguaje natural y recibe respuestas basadas en información real, no en suposiciones.",
        ],
        puntos: [
          "Consultas internas sobre datos reales de la operación.",
          "Automatizaciones que se disparan desde la propia base, por ejemplo avisos ante ciertos cambios.",
          "Asistencia integrada al flujo diario, sin obligar a aprender una herramienta nueva.",
        ],
      },
      {
        titulo: "Cómo trabajamos",
        parrafos: [
          "Nuestro enfoque es empezar por las consultas que más se repiten y por los datos necesarios para responderlas, y definir con claridad qué puede ver y qué puede hacer la IA. Primero consultas, y acciones solo cuando las respuestas demostraron ser confiables.",
        ],
      },
      {
        titulo: "Qué cambió",
        parrafos: [
          "La información correcta quedó disponible al instante para todo el equipo. Se reduce la dependencia de quienes conocen la base de memoria, y las tareas repetitivas se resuelven con automatizaciones en lugar de a mano.",
        ],
      },
      {
        titulo: "Para quién sirve algo así",
        parrafos: [
          "Para empresas que ya tienen una base de datos ordenada, o un sistema de gestión propio, y quieren que su equipo la use sin depender de un técnico. Una IA solo es tan buena como los datos a los que accede, así que suele ir de la mano con ordenar la base primero.",
        ],
      },
    ],
    relacionadas: [
      "/servicios/inteligencia-artificial-para-empresas/",
      "/industrias/inmobiliarias/",
      "/casos/sistema-gestion-alquileres-inmobiliaria/",
    ],
    resumen:
      "Asistente de IA conectado a la base operativa de una inmobiliaria, que responde consultas internas y dispara automatizaciones.",
  },
  {
    ruta: "/casos/conciliacion-bancaria-con-ia/",
    tipo: "caso",
    titulo: "Conciliación bancaria con IA para un estudio contable",
    tituloSeo: "Conciliación bancaria con IA para estudios contables",
    descripcion:
      "Automatizamos la conciliación bancaria de un estudio contable: cruce de extractos y libro, diferencias detectadas y cierres sin revisiones interminables.",
    etiqueta: "Estudios contables",
    entrada:
      "Un estudio contable conciliaba cada mes a mano los movimientos del banco contra su libro. Armamos un flujo que hace el cruce, marca las diferencias y deja al contador solo lo que necesita criterio.",
    secciones: [
      {
        titulo: "El punto de partida",
        parrafos: [
          "Cada cierre implicaba comparar fila por fila el extracto bancario con los registros contables, buscar diferencias y corregirlas. Era una tarea repetitiva, propensa a errores y que se llevaba horas de gente capacitada para otras cosas.",
        ],
      },
      {
        titulo: "Qué construimos",
        parrafos: [
          "Un sistema que toma el extracto del banco y lo cruza contra el libro. Cada movimiento queda en uno de tres estados:",
        ],
        puntos: [
          "Conciliado: coincide con claridad y no necesita revisión.",
          "Sugerido: hay una coincidencia probable que el contador confirma o corrige.",
          "Pendiente: no se encontró correspondencia y requiere atención.",
        ],
      },
      {
        titulo: "Cómo trabajamos",
        parrafos: [
          "El cruce combina reglas claras con comparación inteligente: monto, fecha, referencia y similitud de texto. Donde una regla alcanza, usamos la regla. La IA entra en los casos ambiguos, siempre con revisión humana antes de dar algo por cerrado. Cada banco tiene su formato de extracto, así que sumamos un formateador por banco, de a uno.",
        ],
      },
      {
        titulo: "Qué cambió",
        parrafos: [
          "El contador deja de revisar todo y mira solo lo dudoso. Las diferencias aparecen identificadas desde el primer momento y la base queda lista para reportes. El trabajo del mes pasa de rehacer cruces a validar resultados.",
        ],
      },
      {
        titulo: "Para quién sirve algo así",
        parrafos: [
          "Para estudios contables y áreas administrativas que concilian movimientos todos los meses, con uno o varios bancos, y quieren recuperar tiempo sin perder control sobre el resultado.",
        ],
      },
    ],
    relacionadas: [
      "/industrias/estudios-contables/",
      "/servicios/automatizacion-de-procesos/",
      "/casos/asistente-ia-contable/",
    ],
    resumen:
      "Flujo con IA que cruza extractos bancarios y libro contable, clasifica cada movimiento y deja al contador solo lo que requiere criterio.",
  },
  {
    ruta: "/casos/asistente-ia-contable/",
    tipo: "caso",
    titulo: "Asistente de IA contable con el contexto y los procesos del estudio",
    tituloSeo: "Asistente de IA contable para estudios y empresas",
    descripcion:
      "Un asistente de IA conectado a la documentación, los criterios y los procedimientos de un estudio contable, para consultas, tareas y validaciones del equipo.",
    etiqueta: "Estudios contables · IA",
    entrada:
      "En un estudio contable, buena parte del conocimiento vive en la cabeza de pocas personas. Armamos un asistente de IA que conoce los criterios y procedimientos del estudio y ayuda a todo el equipo.",
    secciones: [
      {
        titulo: "El punto de partida",
        parrafos: [
          "Las dudas sobre cómo tratar un caso, qué criterio se aplica o cómo se hace un trámite terminaban siempre en las mismas personas. Eso las interrumpía y dejaba al equipo parado cuando no estaban.",
        ],
      },
      {
        titulo: "Qué construimos",
        parrafos: [
          "Un asistente conectado a la documentación del estudio, sus criterios contables y sus procedimientos internos. No responde de memoria ni de forma genérica: contesta con el contexto real de cómo se trabaja ahí.",
        ],
        puntos: [
          "Consultas sobre normativa y procesos internos, con respuestas basadas en el material del estudio.",
          "Ayuda en tareas repetitivas, con el contexto necesario para hacerlas bien.",
          "Apoyo en validaciones, siempre con una persona que confirma.",
        ],
      },
      {
        titulo: "Cómo trabajamos",
        parrafos: [
          "Lo más importante es ordenar el conocimiento antes de conectarlo: qué documentos valen, qué criterios están vigentes, qué procesos se repiten. Un asistente es tan confiable como el material que lo alimenta. Después se prueba con preguntas reales del equipo y se ajusta hasta que las respuestas sirven.",
        ],
      },
      {
        titulo: "Qué cambió",
        parrafos: [
          "El conocimiento operativo quedó disponible en segundos para todo el equipo. Se reduce la dependencia de pocas personas clave, y quienes entran nuevos se ponen al día mucho más rápido.",
        ],
      },
      {
        titulo: "Para quién sirve algo así",
        parrafos: [
          "Para estudios y empresas con procesos propios y conocimiento concentrado en pocas personas, que quieren que ese saber esté al alcance de todo el equipo.",
        ],
      },
    ],
    relacionadas: [
      "/servicios/inteligencia-artificial-para-empresas/",
      "/industrias/estudios-contables/",
      "/casos/conciliacion-bancaria-con-ia/",
    ],
    resumen:
      "Asistente de IA que conoce la documentación, los criterios y los procesos de un estudio contable y responde con ese contexto.",
  },
  {
    ruta: "/casos/dashboards-de-rendimiento/",
    tipo: "caso",
    titulo: "Dashboards de rendimiento para negocios con operaciones complejas",
    tituloSeo: "Dashboards de rendimiento para operaciones complejas",
    descripcion:
      "Dashboards con reportes automáticos para salones de eventos, depósitos, inmobiliarias y otras operaciones: KPIs claros sin perseguir planillas.",
    etiqueta: "Datos · Dashboards",
    entrada:
      "Distintos negocios con operaciones complejas, como complejos de eventos, depósitos e inmobiliarias, necesitaban ver cómo les iba sin armar reportes a mano. Les hicimos dashboards que se actualizan solos.",
    secciones: [
      {
        titulo: "El punto de partida",
        parrafos: [
          "En todos los casos la información existía, pero repartida en planillas, hojas compartidas y movimientos bancarios. Armar un reporte significaba juntar archivos, limpiar datos y rehacer los mismos cálculos cada vez, y cuando alguien cambiaba un formato, todo se rompía.",
        ],
      },
      {
        titulo: "Qué construimos",
        parrafos: [
          "Dashboards vivos, adaptados a cada negocio, con reportes automáticos para distintas áreas. No hay un tablero genérico: cada uno mide lo que importa en esa operación, como ocupación, ventas, resultados o movimientos.",
        ],
        puntos: [
          "Varias fuentes integradas en un solo modelo de datos.",
          "KPIs que se actualizan sin carga manual.",
          "Lectura ejecutiva y operativa en el mismo lugar.",
          "Reportes automáticos para varias áreas.",
        ],
      },
      {
        titulo: "Cómo trabajamos",
        parrafos: [
          "Gran parte del trabajo está antes de la visualización: entender el negocio, limpiar, ordenar y modelar los datos. Un dashboard sobre datos frágiles se rompe con el primer cambio, así que prestamos atención a cómo entran los datos y qué pasa cuando cambian.",
        ],
      },
      {
        titulo: "Qué cambió",
        parrafos: [
          "Los equipos dejaron de perseguir planillas para saber cómo iba el negocio. Los indicadores están al día, se leen de un vistazo y quienes dirigen deciden con información actual.",
        ],
      },
      {
        titulo: "Para quién sirve algo así",
        parrafos: [
          "Para negocios con operación diaria, como salones, depósitos, inmobiliarias o empresas de servicios, cuyos datos hoy viven en archivos sueltos y cuyos reportes consumen tiempo cada mes.",
        ],
      },
    ],
    relacionadas: [
      "/servicios/dashboards-y-datos/",
      "/industrias/inmobiliarias/",
    ],
    resumen:
      "Dashboards con reportes automáticos para negocios con operaciones complejas, que reemplazan planillas por indicadores siempre actualizados.",
  },
]
