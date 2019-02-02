import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });

class LocalStorageMock {
  store = {};

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || undefined;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

if (global.document) {
  const originalProcessNextTick = process.nextTick;
  process.nextTick = function(cb) {
    if (cb.toString().indexOf('function flush()') === 0) {
      return;
    }
    return originalProcessNextTick.apply(this, arguments);
  };
}
