import { defineConfig } from 'oxlint'

export default defineConfig({
  plugins: ['typescript', 'react', 'jsx-a11y', 'unicorn', 'oxc'],
  categories: {
    correctness: 'error',
  },
  rules: {
    'typescript/switch-exhaustiveness-check': 'error',
  },
})
