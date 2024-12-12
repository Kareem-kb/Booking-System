<<<<<<< HEAD
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];
=======
/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:@next/next/recommended',
  ],
  overrides: [
    {
      files: ['**/*.{ts,tsx,js,jsx}'],
      plugins: ['@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        '@tailwindcss/no-custom-classname': 'off',
        'react/jsx-no-literals': 'error',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
    tailwindcss: {
      callees: ['twMerge', 'createTheme'],
      classRegex: '^(class(Name)|theme)?$',
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/no-unescaped-entities': 'off',
    'react/react-in-jsx-scope': 'off',
    'tailwindcss/enforces-shorthand': 'off',
    'react/prop-types': 'off',
  },
};
>>>>>>> fc70221 (productPage)
