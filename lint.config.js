module.exports = {
  displayName: 'lint',
  runner: 'jest-runner-eslint',
  testMatch: ['<rootDir>/src/**/*.js'],
  testPathIgnorePatterns: ['/node_modules/', '/coverage/', '/dist/', '/public/']
};
