module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'jest/globals': true,
    'cypress/globals': true
  },
  globals: {
    React: 'writable'
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:cypress/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  plugins: ['jest', 'cypress', 'prettier'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/prefer-interface': 0,
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'error',
    'no-console': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
