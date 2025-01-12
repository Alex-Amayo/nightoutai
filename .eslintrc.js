module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'expo',
    'prettier',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        tabWidth: 2,
        useTabs: false,
        endOfLine: 'auto',
      },
    ],
    quotes: ['error', 'single'],
    indent: ['error', 2],
    semi: ['error', 'always'],
    '@typescript-eslint/no-unused-vars': ['warn'],
    eqeqeq: ['error', 'always'],
    curly: ['error', 'all'],
    'no-var': 'error',
    'prefer-const': 'error',
  },
};
