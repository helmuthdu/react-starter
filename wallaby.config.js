module.exports = function(wallaby) {
  const path = require('path');
  process.env.BABEL_ENV = 'test';
  process.env.NODE_ENV = 'test';
  process.env.NODE_PATH +=
    path.delimiter + path.join(__dirname, 'node_modules') + require('module').Module._initPaths();

  return {
    files: [
      'src/**/*.+(ts|tsx|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)',
      '!src/**/__tests__/**/*.ts?(x)',
      '!src/**/*.stories.ts?(x)'
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
      const jestConfig = require('./jest.config');
      Object.keys(jestConfig.transform || {}).forEach(
        k => ~k.indexOf('^.+\\.(js|jsx') && void delete jestConfig.transform[k]
      );
      delete jestConfig.testEnvironment;
      wallaby.testFramework.configure(jestConfig);
    },

    testFramework: 'jest'
  };
};
