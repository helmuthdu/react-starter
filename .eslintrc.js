module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'jest/globals': true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  globals: {
    React: 'writable'
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'prettier'],
  plugins: ['jest', 'testing-library', 'prettier'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/prefer-interface': 0,
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'error',
    'no-console': 'off'
  }
};
