import type { Pagina } from "../tipos"

export const industrias: Pagina[] = [
  {
    ruta: "/industrias/inmobiliarias/",
    tipo: "industria",
    titulo: "Sistemas y automatización para inmobiliarias",
    tituloSeo: "Software y automatización para inmobiliarias",
    descripcion:
      "Sistemas a medida para inmobiliarias en Uruguay: propiedades, contratos, vencimientos y seguimiento comercial en un solo lugar, con alertas y asistencia de IA.",
    etiqueta: "Industria · Inmobiliarias",
    entrada:
      "Una inmobiliaria maneja a la vez leads, propiedades, contratos, vencimientos y tareas operativas. Cuando eso vive en planillas y chats, se pierde seguimiento. En Spike AI armamos sistemas que lo unifican y lo conectan con automatizaciones reales.",
    secciones: [
      {
        titulo: "Problemas típicos del rubro",
        parrafos: [
          "Ninguno de estos problemas es grave por separado. El costo aparece cuando se suman: un vencimiento que se pasa, una consulta que nadie contesta a tiempo, un dato que está distinto en dos lugares. Con una operación que crece, depender de la memoria de las personas deja de alcanzar.",
        ],
        puntos: [
          "Contratos y vencimientos que se controlan a mano y se descubren tarde.",
          "El seguimiento comercial depende de la memoria de cada agente.",
          "El estado de las propiedades está en una planilla que nadie actualiza igual.",
          "Las tareas operativas se pasan por WhatsApp y se pierden entre conversaciones.",
          "Cada pregunta interna obliga a buscar en varios archivos o a preguntarle a la persona que sabe.",
        ],
      },
      {
        titulo: "Qué construimos",
        parrafos: [
          "Un sistema de gestión de alquileres que reúne propiedades, contratos, vencimientos, estado de las propiedades y tareas en un solo flujo, con alertas y automatizaciones para lo repetitivo. El equipo comercial y el operativo ven la misma información.",
          "Sobre esa base podemos conectar IA para que el equipo consulte datos reales, como el estado de una propiedad o un contrato, y dispare acciones sin cambiar su forma de trabajar. También armamos dashboards que muestran el rendimiento del negocio sin cargar planillas a mano.",
        ],
      },
      {
        titulo: "Casos",
        parrafos: [
          "Hicimos un sistema de gestión de alquileres para una inmobiliaria. Sobre una base así podemos conectar IA para consultas internas y automatizaciones, y en el área de datos desarrollamos dashboards de rendimiento para negocios con operaciones complejas. El cliente no se nombra.",
        ],
      },
      {
        titulo: "Cómo empezar",
        parrafos: [
          "Una charla de diagnóstico sin costo para entender cómo trabajan hoy. Si hay algo para hacer, lo cotizamos con alcance, entregables, precio cerrado y plazos definidos antes de empezar, y arrancamos por lo que más duele, por ejemplo el control de vencimientos. Sumamos módulos cuando el equipo ya lo está usando.",
        ],
      },
    ],
    preguntas: [
      {
        q: "¿Tienen que cambiar el programa que usamos hoy?",
        a: "Casi nunca. Trabajamos sobre lo que ya tenés y conectamos lo que haga falta. Si algo conviene reemplazar, te lo decimos con el motivo.",
      },
      {
        q: "¿Se puede empezar solo con contratos y vencimientos?",
        a: "Sí. Empezamos por una parte acotada, entregamos algo usable en semanas y ampliamos cuando tiene sentido.",
      },
    ],
    relacionadas: [
      "/casos/sistema-gestion-alquileres-inmobiliaria/",
      "/casos/dashboards-de-rendimiento/",
      "/servicios/sistemas-a-medida/",
      "/servicios/inteligencia-artificial-para-empresas/",
    ],
    resumen:
      "Propiedades, contratos, vencimientos y seguimiento comercial en un solo sistema, con alertas, dashboards e IA conectada a la base.",
  },
  {
    ruta: "/industrias/estudios-contables/",
    tipo: "industria",
    titulo: "Automatización e IA para estudios contables",
    tituloSeo: "Automatización e IA para estudios contables",
    descripcion:
      "Conciliación bancaria con IA, asistentes con los criterios de tu estudio y sistemas internos a medida. Menos trabajo repetitivo, más tiempo para revisar.",
    etiqueta: "Industria · Estudios contables",
    entrada:
      "En un estudio contable gran parte del trabajo es repetitivo: conciliar movimientos, cargar comprobantes, responder las mismas consultas. En Spike AI automatizamos esa parte para que el equipo dedique su tiempo a revisar y decidir.",
    secciones: [
      {
        titulo: "Problemas típicos del rubro",
        parrafos: [
          "El volumen de trabajo repetitivo crece con cada cliente que se suma, y la solución habitual es sumar gente. Antes de eso conviene preguntarse qué parte de ese trabajo puede resolverse con reglas, con IA o con un sistema que conecte lo que hoy está disperso.",
        ],
        puntos: [
          "La conciliación bancaria consume horas de revisión cada cierre.",
          "Facturas y comprobantes que se cargan a mano, uno por uno.",
          "Los criterios contables y los procedimientos internos viven en la cabeza de pocas personas.",
          "Clientes, tareas y equipos repartidos en planillas distintas, sin vista común.",
          "Cada área arma sus reportes por separado.",
        ],
      },
      {
        titulo: "Qué construimos",
        parrafos: [
          "Flujos de conciliación con IA y reglas operativas que cruzan extractos, facturas y movimientos y detectan diferencias, para llegar al cierre con la base lista para reporting.",
          "Asistentes de IA conectados a la documentación, los criterios contables y los procedimientos internos del estudio, que ayudan al equipo en consultas, tareas y validaciones y reducen la dependencia de pocas personas clave.",
          "Y herramientas internas a medida para ordenar el trabajo del estudio, con la revisión y aprobación final siempre en manos de las personas.",
        ],
      },
      {
        titulo: "Casos",
        parrafos: [
          "Implementamos conciliación bancaria con IA para un estudio contable y desarrollamos herramientas internas para un estudio. Los clientes no se nombran por una cuestión de confidencialidad.",
        ],
      },
      {
        titulo: "Cómo empezar",
        parrafos: [
          "Una charla sin costo para ver cómo trabajan hoy y qué tarea repetitiva pesa más. Normalmente empezamos por una sola, la dejamos corriendo y recién después sumamos otras. Los datos son tuyos. Antes de empezar definimos dónde se alojan y quién administra las cuentas, y firmamos acuerdo de confidencialidad si lo necesitás.",
        ],
      },
    ],
    preguntas: [
      {
        q: "¿La IA reemplaza la revisión del contador?",
        a: "No. La idea es sacarle al equipo el trabajo repetitivo y dejarle la revisión y la decisión. Definimos con el estudio qué se automatiza y qué pasa por una persona.",
      },
      {
        q: "¿Qué pasa con la información de los clientes del estudio?",
        a: "Los datos son tuyos. Antes de empezar definimos dónde se alojan y quién administra las cuentas, y firmamos acuerdo de confidencialidad si lo necesitás.",
      },
      {
        q: "¿Tenemos que cambiar el software contable que usamos?",
        a: "Casi nunca. Trabajamos sobre lo que ya tenés y conectamos lo que haga falta.",
      },
    ],
    relacionadas: [
      "/casos/conciliacion-bancaria-con-ia/",
      "/servicios/inteligencia-artificial-para-empresas/",
      "/servicios/automatizacion-de-procesos/",
      "/servicios/sistemas-a-medida/",
    ],
    resumen:
      "Conciliación bancaria con IA, asistentes con los criterios del estudio y sistemas internos a medida, con revisión humana al final.",
  },
  {
    ruta: "/industrias/retail-y-ecommerce/",
    tipo: "industria",
    titulo: "Tiendas online y sistemas para retail",
    tituloSeo: "Tiendas online y sistemas para retail en Uruguay",
    descripcion:
      "Tiendas online, catálogos y paneles para marcas y comercios que venden por varios canales: web, Instagram, WhatsApp y local. Hecho a medida en Uruguay.",
    etiqueta: "Industria · Retail y ecommerce",
    entrada:
      "Vender por la tienda online, Instagram, WhatsApp y el local al mismo tiempo suele terminar en planillas paralelas y pedidos perdidos. En Spike AI construimos tiendas, catálogos y sistemas que juntan todo en un solo lugar.",
    secciones: [
      {
        titulo: "Problemas típicos del rubro",
        parrafos: [
          "Muchas marcas chicas empiezan vendiendo por Instagram y WhatsApp, y funciona hasta que el volumen de conversaciones supera lo que una persona puede ordenar. Ahí aparecen los pedidos perdidos, los productos vendidos dos veces y las dudas sobre qué hay en stock.",
        ],
        puntos: [
          "Los pedidos llegan por WhatsApp e Instagram y se pierden entre conversaciones.",
          "El stock y los precios no coinciden entre los distintos canales.",
          "Cada cambio en la web, como un producto agotado, depende de alguien técnico.",
          "No hay un historial único de cada cliente.",
          "El catálogo está en un feed, no en un lugar ordenado con filtros y fotos.",
        ],
      },
      {
        titulo: "Qué construimos",
        parrafos: [
          "Tiendas online con catálogo por rubros y categorías, y un panel donde el equipo carga productos y fotos por su cuenta. Plataformas con disponibilidad por fechas y reservas cuando el negocio es de alquiler. Landings de marca para mostrar una línea de productos con sus variantes.",
          "Y, si el negocio lo pide, podemos sumar un sistema propio que ordene los pedidos de todos los canales.",
        ],
      },
      {
        titulo: "Casos",
        parrafos: [
          "Para Lunar Vintage armamos una tienda online de ropa vintage y libros con panel. Para ReDress, una plataforma de alquiler de vestidos con catálogo, disponibilidad por fechas, turnos de showroom y panel. Para HIKE, una landing de marca de termos con catálogo por líneas y colores.",
        ],
      },
      {
        titulo: "Cómo empezar",
        parrafos: [
          "Una charla sin costo para entender cómo vendés hoy. Si podés mantener el cierre por WhatsApp, lo mantenemos: ordenamos todo lo demás. Cotizamos con precio cerrado y entregamos algo usable rápido, para ir sumando funciones a medida que las necesites.",
        ],
      },
    ],
    preguntas: [
      {
        q: "¿Puedo seguir cerrando las ventas por WhatsApp?",
        a: "Sí. Podemos mantener los canales que ya usás y ordenar el catálogo, los pedidos y el stock alrededor.",
      },
      {
        q: "¿Necesito panel o alcanza con una landing?",
        a: "Si el catálogo casi no cambia, una landing alcanza. Si cambia seguido, un panel propio ahorra mucho trabajo; te lo decimos con el motivo al diagnosticar.",
      },
    ],
    relacionadas: [
      "/casos/lunar-vintage/",
      "/casos/redress/",
      "/casos/hike/",
      "/servicios/plataformas-web-y-tiendas-online/",
      "/servicios/sistemas-a-medida/",
    ],
    resumen:
      "Tiendas online, catálogos, reservas y paneles para marcas que venden por web, Instagram, WhatsApp y local, con todo en un solo lugar.",
  },
]
