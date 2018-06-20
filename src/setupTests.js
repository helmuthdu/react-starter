import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

if (global.document) {
  const originalProcessNextTick = process.nextTick;
  process.nextTick = function(cb) {
    if (cb.toString().indexOf('function flush()') === 0) return;
    return originalProcessNextTick.apply(this, arguments);
  };
}
