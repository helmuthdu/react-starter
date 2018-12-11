// @flow
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

class LocalStorageMock {
  store: any = {};

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || undefined;
  }

  setItem(key: string, value: any) {
    this.store[key] = value.toString();
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

if (global.document) {
  const originalProcessNextTick = process.nextTick;
  process.nextTick = function(cb: (v: any) => void) {
    if (cb.toString().indexOf('function flush()') === 0) {
      return;
    }
    return originalProcessNextTick.apply(this, arguments);
  };
}
