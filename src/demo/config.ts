/**
 * Configuración y textos de la demo para estudios contables.
 * Todo el copy que se cambia seguido vive acá, en un solo lugar.
 */

export const DEMO_BASE = "/democontable"

/** Número de WhatsApp de Spike (el mismo de la landing). */
const WHATSAPP_NUMBER = "59891315670"

const WHATSAPP_MESSAGE =
  "Hola, vi la demo para estudios contables de Spike y me gustaría contarles cómo trabajamos hoy, para ver qué se puede adaptar a mi estudio."

/**
 * Arma el link de WhatsApp. Si la demo se abrió con ?para=Nombre,
 * se agrega "Soy de {Nombre}." al final del mensaje.
 */
export function whatsappHref(para?: string | null): string {
  const message = para ? `${WHATSAPP_MESSAGE} Soy de ${para}.` : WHATSAPP_MESSAGE
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/**
 * Frase del botón de contacto.
 * Alternativas que quedaron sobre la mesa: "Armemos el tuyo",
 * "Quiero esto en mi estudio", "Contanos cómo trabajás", "Adaptalo a mi estudio".
 */
export const CONTACT_LABEL = "Hablemos de tu estudio"

export const texts = {
  studioName: "Estudio Demo & Asociados",
  studioTag: "Demo para estudios contables",

  banner: "Demo con datos de ejemplo — nada de lo que ves es información real.",
  bannerPara: (para: string) => `Demo preparada para ${para} — datos de ejemplo.`,

  footer:
    "Todos los nombres, importes y documentos son ficticios. Cualquier parecido con la realidad es casualidad.",

  welcomeTitle: "Bienvenido a la demo",
  welcomeBody:
    "Así se vería un sistema de gestión hecho a medida para un estudio contable. Todo lo que ves son datos de ejemplo. Recorrelo libremente o seguí el recorrido de 2 minutos.",
  welcomeStart: "Empezar recorrido",
  welcomeExplore: "Explorar yo",

  roleHintTitle: "Vista: Socio / Contador",
  roleHint:
    "Tocá acá para ver qué cambia entre lo que ve un socio y lo que ve un contador.",
  roleChanged: (role: string) => `Ahora estás viendo el sistema como ${role}`,

  lockedTitle: "Esta pantalla es solo para socios.",
  lockedAction: "Cambiar a vista Socio",
  lockedTooltip: "Solo para socios",

  notAllowed: "Solo podés modificar clientes de tu equipo.",
  resetDone: "Demo reiniciada: volvió todo al estado inicial.",
  fakeDownload: "En tu sistema esto descarga el archivo. En la demo no se descarga nada.",
  fakeUpload: "En la demo no se suben archivos. Usá los de ejemplo.",

  sidebarCtaTitle: "¿Armamos el tuyo?",
  sidebarCtaBody: "Contanos cómo trabaja tu estudio y vemos qué se puede adaptar.",

  proof: "Este sistema funciona hoy en un estudio contable y legal uruguayo.",
} as const
