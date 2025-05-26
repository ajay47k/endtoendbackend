// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  files: ['**/*.ts'],
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier // ⬅ added this to apply Prettier-compatible config
  ],
  rules: {
    'no-console': 'error',
    'quotes': ['error', 'single', { allowTemplateLiterals: true }],
  },
});
