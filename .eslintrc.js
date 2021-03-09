module.exports = {
  env: {
    'jest/globals': true,
    'cypress/globals': true
  },
  extends: ['react-app', 'react-app/jest', 'plugin:prettier/recommended', 'prettier'],
  plugins: ['jest', 'cypress', 'prettier'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/prefer-interface': 0,
    'prettier/prettier': 'error',
    'no-console': 'off'
  }
};
