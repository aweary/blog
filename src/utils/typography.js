import Typography from "typography"

const typography = new Typography({
  bodyColor: "#000000",
  baseFontSize: "16px",
  headerWeight: 700,
  baseLineHeight: 1.8,
  headerColor: '#1b0138',
  bodyFontFamily: ["Arvo", "system-ui"],
  headerFontFamily: ["IBM Plex Serif", "system-ui", "sans-serif"],
  googleFonts: [
    {
      name: "IBM Plex Serif",
      styles: ["400", "600", "700"],
    },
    {
      name: "Arvo",
      styles: ["400", "600", "700"],
    },
    {
      name: "IBM Plex Mono",
      styles: ["400", "500"]
    }
  ],
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
