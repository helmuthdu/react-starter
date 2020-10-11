module.exports = {
  env: {
    'jest/globals': true,
    'cypress/globals': true
  },
  extends: ['react-app', 'react-app/jest', 'plugin:prettier/recommended', 'prettier/react'],
  plugins: ['prettier', 'jest', 'cypress'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off'
  }
};
