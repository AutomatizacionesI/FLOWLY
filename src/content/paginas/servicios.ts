import type { Pagina } from "../tipos"

export const servicios: Pagina[] = [
  {
    ruta: "/servicios/sistemas-a-medida/",
    tipo: "servicio",
    titulo: "Sistemas a medida para empresas en Uruguay",
    tituloSeo: "Sistemas a medida para empresas en Uruguay",
    descripcion:
      "Desarrollamos sistemas de gestión a medida en Montevideo: clientes, contratos, pedidos y tareas en un solo lugar, con alcance definido y entrega por partes.",
    etiqueta: "Servicio · Software",
    entrada:
      "Un sistema a medida es una herramienta hecha para cómo trabaja tu empresa, no al revés. Reemplaza planillas sueltas, chats y carpetas por un solo lugar donde cada dato se carga una vez y lo ve quien lo necesita. Lo construimos en Spike AI, en Montevideo, con equipos que no son técnicos.",
    secciones: [
      {
        titulo: "Qué es un sistema a medida",
        parrafos: [
          "Es un software armado alrededor de tu operación: tus estados, tus responsables, tus reglas. Puede ser un panel interno para el equipo, un sistema de seguimiento comercial, un control de contratos y vencimientos o una bandeja única de pedidos.",
          "No empezamos por la tecnología. Empezamos por entender el circuito que hoy se hace a mano y por dónde se pierde información. Recién después decidimos qué construir y qué conviene dejar como está.",
        ],
      },
      {
        titulo: "Cuándo conviene",
        puntos: [
          "El mismo dato se carga tres veces en tres lugares distintos.",
          "Los pedidos o consultas llegan por WhatsApp y se pierden entre conversaciones.",
          "Si falta la persona que sabe cómo funciona todo, el proceso se frena.",
          "Las herramientas de mercado no calzan con tu forma de trabajar y terminás forzándolas.",
          "Necesitás que jefes y equipo vean la misma información sin pedirse reportes.",
        ],
      },
      {
        titulo: "Qué recibís",
        puntos: [
          "El circuito funcionando en producción, con tus datos. No un prototipo.",
          "Tus datos migrados: lo que vive en planillas entra ordenado y sin duplicados.",
          "Tu equipo capacitado hasta que lo maneje sin nosotros.",
          "Alguien del otro lado: nos escribís y te contestamos nosotros, no un ticket.",
        ],
      },
      {
        titulo: "Cómo lo hacemos",
        parrafos: [
          "Primero una charla de diagnóstico sin costo para entender cómo trabajan hoy. Después arrancamos por lo que más duele y entregamos algo usable en semanas, no al final de un proyecto largo. Los sistemas completos llevan más tiempo, pero los entregamos por partes para que veas resultados antes de terminar.",
          "Antes de empezar definimos juntos el alcance, los entregables y los plazos. Y casi nunca hace falta cambiar las herramientas que ya usás: trabajamos sobre lo que tenés y conectamos lo que haga falta.",
        ],
      },
      {
        titulo: "Casos",
        parrafos: [
          "Armamos un sistema de gestión de alquileres para una inmobiliaria, con propiedades, contratos y vencimientos en un solo flujo. Para Lunar Vintage hicimos una tienda online con panel de carga, y para ReDress una plataforma de alquiler de vestidos con disponibilidad por fechas y panel de administración.",
        ],
      },
    ],
    preguntas: [
      {
        q: "¿Mi equipo tiene que ser técnico para usar el sistema?",
        a: "No. Es el caso más común. Capacitamos al equipo y dejamos el sistema funcionando con la gente que ya trabaja ahí. Si nadie lo usa, no sirvió.",
      },
      {
        q: "¿Los datos quedan en mi empresa?",
        a: "Sí. Los datos son tuyos. Antes de empezar definimos dónde se alojan y quién administra las cuentas, y firmamos acuerdo de confidencialidad si lo necesitás.",
      },
      {
        q: "¿Se puede empezar con algo chico y ampliar después?",
        a: "Sí, es nuestra forma de trabajar. Empezamos por un problema concreto, entregamos una primera parte y sumamos módulos cuando tiene sentido.",
      },
    ],
    relacionadas: [
      "/casos/sistema-gestion-alquileres-inmobiliaria/",
      "/casos/redress/",
      "/casos/lunar-vintage/",
      "/servicios/automatizacion-de-procesos/",
      "/industrias/inmobiliarias/",
    ],
    resumen:
      "Sistemas de gestión hechos para tu operación: un solo lugar para clientes, contratos, pedidos y tareas, con alcance definido y entrega por partes.",
  },
  {
    ruta: "/servicios/automatizacion-de-procesos/",
    tipo: "servicio",
    titulo: "Automatización de procesos para empresas",
    tituloSeo: "Automatización de procesos para empresas en Uruguay",
    descripcion:
      "Automatizamos tareas repetitivas de tu empresa: cargas duplicadas, reportes a mano, seguimientos y alertas. Empezamos por una tarea y escalamos de a poco.",
    etiqueta: "Servicio · Automatización",
    entrada:
      "Automatizar un proceso es lograr que una tarea repetitiva corra sola, igual todas las veces, esté quien esté. En Spike AI no cambiamos toda tu estructura de golpe: arrancamos por una sola tarea crítica y la dejamos funcionando antes de pasar a la siguiente.",
    secciones: [
      {
        titulo: "Qué es automatizar un proceso",
        parrafos: [
          "Es conectar las herramientas que ya usás para que los datos se muevan solos: que un pedido entre al sistema con su estado y su responsable, que un vencimiento genere una alerta, que un reporte llegue el día que tiene que llegar.",
          "No se trata de reemplazar personas, sino de sacarles el trabajo mecánico para que el equipo se dedique a lo que realmente importa.",
        ],
      },
      {
        titulo: "Cuándo conviene",
        puntos: [
          "Alguien copia datos de una planilla a otra todas las semanas.",
          "El reporte del mes se arma a mano juntando varias fuentes.",
          "Los seguimientos y avisos dependen de que alguien se acuerde.",
          "El proceso solo lo sabe hacer una persona.",
          "Los pedidos llegan por distintos canales y hay que pasarlos a mano.",
        ],
      },
      {
        titulo: "Qué incluye",
        puntos: [
          "Un diagnóstico para detectar cuellos de botella concretos y priorizar oportunidades reales.",
          "La primera automatización corriendo en producción, con tus datos.",
          "Alertas y reglas para las tareas que hoy se hacen a mano.",
          "Capacitación al equipo y soporte directo con quienes lo construyeron.",
        ],
      },
      {
        titulo: "Cómo lo hacemos",
        parrafos: [
          "Nos sentamos a charlar sobre tu día a día, sin compromiso, y definimos por dónde conviene empezar. La primera automatización suele estar corriendo en pocas semanas. Después sumamos módulos solo cuando tiene sentido, para que el equipo se adapte sin choques y la inversión acompañe el crecimiento real del negocio.",
          "Cuando la empresa está lista, las herramientas que empezaron aisladas se pueden unificar en un solo circuito conectado. Pero no hace falta pensar en eso el primer día.",
        ],
      },
      {
        titulo: "Casos",
        parrafos: [
          "En una inmobiliaria unificamos contratos y tareas en un solo sistema. Para un estudio contable armamos reglas que cruzan los extractos bancarios con los registros y marcan lo que hay que revisar.",
        ],
      },
    ],
    preguntas: [
      {
        q: "¿Cuánto tarda en estar funcionando?",
        a: "La primera automatización suele estar corriendo en pocas semanas. Los sistemas completos llevan más, pero entregamos por partes.",
      },
      {
        q: "¿Tengo que cambiar las herramientas que uso hoy?",
        a: "Casi nunca. Trabajamos sobre lo que ya tenés y conectamos lo que haga falta. Si algo conviene reemplazar, te lo decimos con el motivo.",
      },
      {
        q: "¿Qué pasa si surge algo nuevo durante el proyecto?",
        a: "Se evalúa como un cambio de alcance y lo acordamos antes de hacerlo.",
      },
    ],
    relacionadas: [
      "/casos/sistema-gestion-alquileres-inmobiliaria/",
      "/casos/conciliacion-bancaria-con-ia/",
      "/servicios/sistemas-a-medida/",
      "/servicios/inteligencia-artificial-para-empresas/",
      "/industrias/estudios-contables/",
    ],
    resumen:
      "Tareas repetitivas que corren solas: cargas, reportes, alertas y seguimientos. Empezamos por una tarea crítica y escalamos de a poco.",
  },
  {
    ruta: "/servicios/inteligencia-artificial-para-empresas/",
    tipo: "servicio",
    titulo: "Inteligencia artificial para empresas",
    tituloSeo: "Inteligencia artificial para empresas en Uruguay",
    descripcion:
      "Asistentes de IA con el contexto de tu empresa, IA conectada a tus bases de datos y conciliación con IA. Aplicaciones concretas, desde Montevideo.",
    etiqueta: "Servicio · IA",
    entrada:
      "La IA sirve cuando tiene el contexto de tu empresa: tus procesos, tus criterios, tus datos. Sin eso, es un chat genérico. En Spike AI armamos asistentes y flujos de IA conectados a la información real del negocio, para que ayuden al equipo en tareas concretas.",
    secciones: [
      {
        titulo: "Qué es IA aplicada a una empresa",
        parrafos: [
          "No es instalar un chat y listo. Es darle a la IA acceso a documentación, procedimientos y bases de datos propias para que responda con información confiable, dispare acciones o valide tareas repetitivas.",
          "Trabajamos tres líneas principales: asistentes con contexto, IA conectada a bases de datos y conciliación con IA.",
        ],
      },
      {
        titulo: "Qué construimos",
        puntos: [
          "Asistentes internos conectados a tu documentación y tus procedimientos, que pueden ayudar al equipo en consultas, tareas y validaciones.",
          "IA conectada a la base operativa, para responder preguntas internas con datos reales y disparar acciones.",
          "Conciliación con IA: cruce de extractos, facturas y movimientos, con detección de diferencias.",
          "Reglas y controles para que una persona revise lo que importa y no todo.",
        ],
      },
      {
        titulo: "Cuándo conviene",
        puntos: [
          "El conocimiento operativo vive en la cabeza de pocas personas.",
          "El equipo pierde tiempo buscando información que ya existe en algún documento o sistema.",
          "Hay tareas administrativas repetitivas que requieren criterio, no solo copiar y pegar.",
          "Los cierres dependen de revisiones largas de movimientos y comprobantes.",
        ],
      },
      {
        titulo: "Cómo lo hacemos",
        parrafos: [
          "Partimos del problema, no de la herramienta. Definimos con vos qué información debe usar la IA, qué puede hacer sola y qué tiene que pasar por una persona. Empezamos con un alcance acotado y lo ampliamos cuando el equipo ya lo usa.",
          "Los datos son tuyos. Antes de empezar definimos dónde se alojan y quién administra las cuentas, y firmamos acuerdo de confidencialidad si lo necesitás.",
        ],
      },
      {
        titulo: "Casos",
        parrafos: [
          "Podemos armar asistentes conectados a la documentación y los procedimientos de tu empresa, o IA conectada a tu base operativa para que el equipo consulte sin cambiar su flujo diario. Y armamos flujos de conciliación bancaria con IA y reglas operativas.",
        ],
      },
    ],
    preguntas: [
      {
        q: "¿La IA puede equivocarse?",
        a: "Sí, por eso diseñamos controles: definimos con tu equipo qué puede hacer sola y qué requiere revisión de una persona, sobre todo en temas financieros.",
      },
      {
        q: "¿Mis datos se usan para entrenar modelos?",
        a: "Los datos son tuyos. Antes de empezar definimos dónde se alojan y quién administra las cuentas, y firmamos acuerdo de confidencialidad si lo necesitás. También definimos qué información se usa y cómo.",
      },
      {
        q: "¿Mi equipo necesita saber de IA?",
        a: "No. Capacitamos al equipo y dejamos el asistente integrado en lo que ya hacen. Si nadie lo usa, no sirvió.",
      },
    ],
    relacionadas: [
      "/casos/conciliacion-bancaria-con-ia/",
      "/servicios/dashboards-y-datos/",
      "/industrias/estudios-contables/",
    ],
    resumen:
      "Asistentes con el contexto de tu empresa, IA conectada a tus bases de datos y conciliación con IA, con controles y revisión humana.",
  },
  {
    ruta: "/servicios/dashboards-y-datos/",
    tipo: "servicio",
    titulo: "Dashboards, bases de datos y reporting",
    tituloSeo: "Dashboards automatizados y ordenamiento de datos",
    descripcion:
      "Dashboards automáticos, bases de datos ordenadas y reportes que se generan solos. Indicadores claros sin perseguir planillas. Hecho en Montevideo.",
    etiqueta: "Servicio · Datos",
    entrada:
      "Un dashboard solo sirve si los datos de abajo son confiables. Por eso en Spike AI trabajamos las dos puntas: ordenamos la base y armamos el reporting automático encima, para que los indicadores se actualicen sin carga manual y se lean de un vistazo.",
    secciones: [
      {
        titulo: "Qué es",
        parrafos: [
          "Son tres cosas que suelen ir juntas: dashboards vivos con los indicadores que realmente usás, reportes que se generan solos y llegan cuando tienen que llegar, y el ordenamiento de las bases de datos que los alimentan.",
          "Cuando la base se ordena, la operación cambia: deja de depender de parches, archivos rotos y de la persona que sabe cómo armar el reporte.",
        ],
      },
      {
        titulo: "Cuándo conviene",
        puntos: [
          "El reporte del mes se arma a mano copiando de varias planillas.",
          "Cada área tiene su propia versión de los números.",
          "La base de datos creció sin criterios y nadie se anima a tocarla.",
          "Querés ver ocupación, ventas, márgenes o alertas sin pedirle a nadie que los calcule.",
        ],
      },
      {
        titulo: "Qué recibís",
        puntos: [
          "Una base limpia y con estructura definida, con criterios claros de carga.",
          "Dashboards con lectura ejecutiva y operativa en el mismo lugar.",
          "Reportes automáticos para distintas áreas.",
          "Tus datos migrados sin duplicados y tu equipo capacitado para usarlos.",
        ],
      },
      {
        titulo: "Cómo lo hacemos",
        parrafos: [
          "Primero entendemos qué decisiones querés tomar con los datos y de dónde salen hoy. Después ordenamos lo necesario, definimos los criterios y montamos el reporting. Entregamos por partes: primero el indicador que más ayuda, después el resto.",
          "La idea es que, una vez armado, el dashboard sea de todos: que quien dirige mire el panorama general y quien opera vea el detalle de su área, sin pedirle a nadie que prepare una planilla. Si el equipo no lo abre todos los días, lo ajustamos hasta que sirva.",
          "Los datos son tuyos. Antes de empezar definimos dónde se alojan y quién administra las cuentas, y firmamos acuerdo de confidencialidad si lo necesitás.",
        ],
      },
      {
        titulo: "Casos",
        parrafos: [
          "Desarrollamos dashboards de rendimiento para negocios con operaciones complejas.",
        ],
      },
    ],
    preguntas: [
      {
        q: "¿Tengo que dejar de usar mis planillas?",
        a: "Casi nunca. Trabajamos sobre lo que ya tenés. Si conviene reemplazar algo, te lo decimos con el motivo.",
      },
      {
        q: "¿Por qué ordenar la base antes del dashboard?",
        a: "Porque un dashboard sobre datos desordenados muestra números en los que nadie confía. Con una base confiable, el reporting es mucho más estable.",
      },
      {
        q: "¿Los reportes se actualizan solos?",
        a: "Ese es el objetivo: indicadores actualizados sin carga manual y reportes que llegan el día que tienen que llegar.",
      },
    ],
    relacionadas: [
      "/casos/dashboards-de-rendimiento/",
      "/servicios/inteligencia-artificial-para-empresas/",
      "/industrias/inmobiliarias/",
    ],
    resumen:
      "Dashboards automáticos, bases de datos ordenadas y reportes que se generan solos, para ver el negocio sin perseguir planillas.",
  },
  {
    ruta: "/servicios/plataformas-web-y-tiendas-online/",
    tipo: "servicio",
    titulo: "Plataformas web y tiendas online",
    tituloSeo: "Tiendas online y plataformas web a medida en Uruguay",
    descripcion:
      "Tiendas online, plataformas con catálogo, reservas y panel de administración, y landings de marca. Diseñadas para que puedas gestionarlas sin depender de nadie.",
    etiqueta: "Servicio · Web",
    entrada:
      "Una web que vende o reserva tiene que poder administrarse sola. En Spike AI construimos tiendas online, plataformas con catálogo y reservas, y landings de marca, con un panel para que el equipo cargue y cambie lo que necesite sin tocar código.",
    secciones: [
      {
        titulo: "Qué es",
        parrafos: [
          "Son tres formatos según lo que necesite el negocio: una tienda online con catálogo y panel de carga, una plataforma con catálogo, disponibilidad o reservas y panel de administración, o una landing de marca para presentar productos y recibir consultas.",
          "En los tres casos pensamos en quién la va a usar todos los días: quien carga productos, quien responde pedidos y quien compra desde el celular.",
        ],
      },
      {
        titulo: "Cuándo conviene",
        puntos: [
          "Vendés o alquilás por Instagram y WhatsApp y los pedidos se mezclan entre conversaciones.",
          "Querés mostrar un catálogo ordenado, con filtros y fotos, y no un feed.",
          "Cada cambio en la web, como un producto agotado o un descuento, depende de que alguien toque el código.",
          "Necesitás que la disponibilidad por fechas o turnos se vea en tiempo real.",
        ],
      },
      {
        titulo: "Qué incluye",
        puntos: [
          "Catálogo con categorías, filtros y fichas de producto.",
          "Panel de administración para cargar productos, fotos y estados.",
          "Reservas, disponibilidad por fechas o turnos, cuando el negocio lo necesita.",
          "Contacto o cierre de compra por los canales que ya usás, como WhatsApp.",
          "Diseño pensado para celular y capacitación al equipo.",
        ],
      },
      {
        titulo: "Cómo lo hacemos",
        parrafos: [
          "Arrancamos por lo esencial y entregamos algo usable rápido; después sumamos funciones cuando el negocio las pide. Aprendimos que una landing estática funciona para presentar una marca, pero cuando hay catálogo que cambia, un panel propio ahorra mucho trabajo, y por eso lo proponemos cuando hace falta.",
        ],
      },
      {
        titulo: "Casos",
        parrafos: [
          "Para Lunar Vintage hicimos una tienda online de ropa vintage y libros con panel de carga. Para ReDress, una plataforma de alquiler de vestidos con catálogo, disponibilidad por fechas, turnos de showroom y panel. Y para HIKE, una landing de marca de termos con catálogo por líneas y colores.",
        ],
      },
    ],
    preguntas: [
      {
        q: "¿Puedo cambiar productos y fotos yo mismo?",
        a: "En las tiendas y plataformas, sí: el panel de administración está pensado para eso. En una landing estática, los cambios requieren intervención nuestra, y te lo explicamos antes de empezar.",
      },
      {
        q: "¿Tengo que cambiar cómo vendo hoy?",
        a: "No necesariamente. Podemos mantener el cierre por WhatsApp u otros canales que ya usás y ordenar todo lo demás.",
      },
      {
        q: "¿Cuánto tarda?",
        a: "Depende del alcance, que definimos antes de empezar. Entregamos por partes para que veas avances antes de terminar.",
      },
    ],
    relacionadas: [
      "/casos/lunar-vintage/",
      "/casos/redress/",
      "/casos/hike/",
      "/industrias/retail-y-ecommerce/",
      "/servicios/sistemas-a-medida/",
    ],
    resumen:
      "Tiendas online, plataformas con catálogo, reservas y panel, y landings de marca, para que el equipo gestione todo sin depender de nadie.",
  },
]
