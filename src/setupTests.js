require('@testing-library/jest-dom/extend-expect');
require('mutationobserver-shim');
require('@formatjs/intl-relativetimeformat/dist/locale-data/en');
require('@formatjs/intl-relativetimeformat/polyfill');

global.fetch = require('jest-fetch-mock');

window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: () => void 0,
      removeListener: () => void 0
    };
  };

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  function(callback) {
    setTimeout(callback, 0);
  };
