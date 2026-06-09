import { defineConfig } from 'oxfmt'

export default defineConfig({
  semi: false,
  singleQuote: true,
  printWidth: 100,
  sortTailwindcss: { attributes: ['className', 'class'] },
  sortImports: {},
  sortPackageJson: true,
})
