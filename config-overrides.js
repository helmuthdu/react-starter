const { compose } = require('react-app-rewired');
const rewireEslint = require('react-app-rewire-eslint');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const rewireStyledComponents = require('react-app-rewire-styled-components');

module.exports = compose(
  rewireEslint,
  rewireReactHotLoader,
  rewireStyledComponents
);
