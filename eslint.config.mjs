import eslint from '@eslint/js';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import playwrightLint from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  files: ['**/*.ts'],
  plugins: {
    '@typescript-eslint': tseslintPlugin, // TypeScript ESLint plugin
    'eslint-plugin-playwright': playwrightLint, // Playwright linting plugin
  },
  languageOptions: {
    parser: tsParser, // TypeScript parser
    parserOptions: {
      project: './tsconfig.json', // TypeScript project configuration
      tsconfigRootDir: import.meta.dirname, // Root directory for tsconfig
    },
  },
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    playwrightLint.configs['flat/recommended'],
    prettierConfig,
  ],
  rules: {
    '@typescript-eslint/no-floating-promises': 'error', // Require proper promise handling
    '@typescript-eslint/await-thenable': 'error', // Ensure await is used on thenables only
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true, // Allow implicit returns in expressions
        allowTypedFunctionExpressions: true, // Allow typed function expressions
      },
    ],
    'playwright/expect-expect': [
      'warn',
      {
        assertFunctionNames: [], // Recognize custom assertion functions
      },
    ],
    'playwright/no-wait-for-timeout': 'warn', // Discourage waitForTimeout usage
    'playwright/prefer-web-first-assertions': 'error', // Prefer web-first assertions
    'playwright/no-page-pause': 'error', // Prevent accidental page.pause() in code
    'playwright/no-element-handle': 'warn', // Discourage ElementHandle usage
    'playwright/no-eval': 'error', // Prevent unsafe eval usage
    'playwright/no-focused-test': 'error', // Prevent .only in tests
    'playwright/no-skipped-test': 'warn', // Warn about .skip in tests
    'playwright/valid-expect': 'error', // Ensure valid expect assertions
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error'],
      },
    ], // Allow only warn/error console methods
    'prefer-const': 'error', // Prefer const over let when possible
    'no-var': 'error', // Disallow var declarations
  },
});
