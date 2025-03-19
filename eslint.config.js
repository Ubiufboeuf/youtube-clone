import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import stylisticTs from '@stylistic/eslint-plugin'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      '@stylistic/ts': stylisticTs
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-empty-pattern': 'off',
      '@stylistic/ts/quotes': ['error', 'single'],
      '@stylistic/ts/jsx-quotes': ['error', 'prefer-single'],
      'semi': ['error', 'never'],
      'comma-dangle': ['error', 'never'],
      '@stylistic/ts/eol-last': ['error', 'always']
    }
  }
]
