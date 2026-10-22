import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './': built files use relative paths, so the site works at any address (e.g. pranayyyb.github.io/portfolio/)
export default defineConfig({ plugins: [react()], base: './' })
