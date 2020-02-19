module.exports = function(wallaby) {
  const path = require('path');
  process.env.BABEL_ENV = 'test';
  process.env.NODE_ENV = 'test';
  process.env.NODE_PATH +=
    path.delimiter +
    path.join(__dirname, 'node_modules') +
    path.delimiter +
    path.join(__dirname, 'node_modules/react-scripts/node_modules');
  require('module').Module._initPaths();

  return {
    files: [
      'src/**/*.+(js|jsx|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)',
      '!src/**/__tests__/**/*.js',
      '!src/**/*.stories.js?(x)',
      '!src/serviceWorker.js'
    ],

    tests: ['src/**/__tests__/**/*.js'],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      '**/*.js?(x)': wallaby.compilers.babel({
        presets: ['react-app']
      })
    },

    setup: wallaby => {
      const jestConfig = require('react-scripts/scripts/utils/createJestConfig')(p =>
        require.resolve('react-scripts/' + p)
      );
      Object.keys(jestConfig.transform || {}).forEach(
        k => ~k.indexOf('^.+\\.(js|jsx') && void delete jestConfig.transform[k]
      );
      delete jestConfig.testEnvironment;
      jestConfig.setupFilesAfterEnv = [`${wallaby.localProjectDir}/src/setupTests.js`];
      wallaby.testFramework.configure(jestConfig);
    },

    testFramework: 'jest'
  };
};
