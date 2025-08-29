import js from '@eslint/js';
import ts from 'typescript-eslint';
import jsx from 'jsx-dom-runtime/eslint-plugin';

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  jsx,
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        process: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-use-before-define': 'error',
      'no-else-return': 'error',
      'no-trailing-spaces': 'error',
      'no-use-before-define': 'off',
      'semi': [
        'error',
        'always',
      ],
      'space-before-function-paren': [
        'error',
        {
          'anonymous': 'always',
          'named': 'never',
          'asyncArrow': 'always',
        },
      ],
      'comma-dangle': [
        'error',
        'always-multiline',
      ],
      'no-unused-vars': 'off',
      'quotes': [
        'error',
        'single',
      ],
      'no-multiple-empty-lines': [
        'error',
        {
          'max': 1,
          'maxBOF': 0,
          'maxEOF': 0,
        },
      ],
    },
  },
);
