module.exports = {
  env: {
    'jest/globals': true,
    'cypress/globals': true
  },
  extends: [
    'react-app',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'prettier/react',
  ],
  plugins: ['prettier', 'jest', 'cypress'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off'
  }
};
