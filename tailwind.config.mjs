/* eslint-disable quote-props */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#0f0f0f', 'content': '#fff' }
      }
    }
  },
  plugins: []
}
