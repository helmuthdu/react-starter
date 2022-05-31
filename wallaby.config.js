/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = function () {
  const path = require('path');
  import.meta.env.BABEL_ENV = 'test';
  import.meta.env.NODE_ENV = 'test';
  import.meta.env.NODE_PATH +=
    path.delimiter +
    path.join(__dirname, 'node_modules') +
    path.delimiter +
    path.join(__dirname, 'node_modules/react-scripts/node_modules');
  require('module').Module._initPaths();

  return {
    files: [
      { pattern: 'src/setupTests.ts', instrument: false },
      'src/**/*.+(ts|tsx|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)',
      '!src/**/__tests__/**/*.ts?(x)',
      '!src/**/*.stories.ts?(x)',
      '!src/**/*.d.ts'
    ],

    tests: ['src/**/__tests__/**/*.ts?(x)'],

    env: {
      type: 'node',
      runner: 'node'
    },

    preprocessors: {
      '**/*.js?(x)': file =>
        require('@babel/core').transform(file.content, {
          sourceMap: true,
          compact: false,
          filename: file.path,
          presets: [require('babel-preset-jest'), 'react-app']
        })
    },

    setup: wallaby => {
      const jestConfig = require('./jest.config.js');
      Object.keys(jestConfig.transform || {}).forEach(
        k => ~k.indexOf('^.+\\.(js|jsx') && void delete jestConfig.transform[k]
      );
      delete jestConfig.testEnvironment;
      jestConfig.setupFilesAfterEnv = [`${wallaby.localProjectDir}/jest.setup.js`];
      wallaby.testFramework.configure(jestConfig);
    },

    testFramework: 'jest'
  };
};
