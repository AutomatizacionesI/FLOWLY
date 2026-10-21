/**
 * Los colores que necesitan los gráficos como valor literal.
 *
 * El resto de la demo usa las variables CSS (--d-green y compañía), pero
 * recharts los recibe como atributos del SVG, así que acá van en crudo.
 * Si cambia el verde en demo.css, hay que cambiarlo también acá.
 */
export const chart = {
  /** El mismo --d-green de demo.css. */
  green: "#33604a",
  /** Verde apagado, para las series secundarias y el resto de las barras. */
  greenSoft: "#b9ccbf",
} as const
