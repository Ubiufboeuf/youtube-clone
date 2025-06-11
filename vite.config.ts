import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    allowedHosts: ['youtube-clone-1d8-pages-dev', 'bc5d-2800-a4-1030-fe00-fffc-9d2f-f701-2853.ngrok-free.app']
  }
})
