module.exports = {
  env: {
    'jest/globals': true,
    'cypress/globals': true
  },
  extends: [
    'react-app',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:cypress/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'prettier/@typescript-eslint',
    'prettier/react'
  ],
  plugins: ['prettier', 'jest', 'cypress'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-object-literal-type-assertion': 0,
    '@typescript-eslint/prefer-interface': 0,
    'prettier/prettier': 'error',
    'react-hooks/exhaustive-deps': 0,
    'no-console': 'off'
  }
};
