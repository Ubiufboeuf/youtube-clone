import type { Config } from '@react-router/dev/config'

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false   // voy a probar un rato sin especificar sin ssr, es para probar el HydrateFallback y ver si afecta a la UX
} satisfies Config
