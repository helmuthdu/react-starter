require('@testing-library/jest-dom/extend-expect');
require('mutationobserver-shim');

global.fetch = require('jest-fetch-mock');

window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
    };
  };

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  function(callback) {
    setTimeout(callback, 0);
  };
