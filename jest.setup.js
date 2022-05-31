require('mutationobserver-shim');

global.fetch = require('jest-fetch-mock');
global.URL.createObjectURL = jest.fn();

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn()
    };
  };

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  function (callback) {
    setTimeout(callback, 0);
  };
