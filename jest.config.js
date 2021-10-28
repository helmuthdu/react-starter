module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  testMatch: ['<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}', '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
  coverageDirectory: '<rootDir>/.coverage',
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.story.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  transform: {
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.(js|jsx|ts|tsx)$': [
      '<rootDir>/node_modules/babel-jest',
      {
        presets: ['next/babel'],
        plugins: []
      }
    ]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  testURL: 'http://localhost/'
};
