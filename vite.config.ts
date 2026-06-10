/// <reference types="vitest/config" />

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const repoName = process.env.REPO_NAME ?? 'kinder-zeit-planer'
const base =
  process.env.GITHUB_PAGES === 'true' && repoName ? `/${repoName}/` : '/'

export default defineConfig({
  base,
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
})
