import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { spawn } from 'redux-saga/effects';
import thunkMiddleware from 'redux-thunk';

export const isServer = !(typeof window !== 'undefined' && window.document && window.document.createElement);

type StoreInstance = Store;

let storeInstance: StoreInstance;

export default (modules: any[] = []) => {
  if (storeInstance) {
    return storeInstance;
  }

  // Do we have preload state available? Great, save it.
  const initialState = !isServer ? (window as any).__PRELOADED_STATE__ : {};
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [thunkMiddleware, sagaMiddleware];
  const enhancers = [];

  if (process.env.NODE_ENV === 'development' && !isServer) {
    const devToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  );

  // Delete it once we have it stored in a variable
  if (!isServer) {
    delete (window as any).__PRELOADED_STATE__;
  }

  const rootReducer = () =>
    combineReducers({
      ...modules.reduce((acc, module: any) => ({ ...acc, [module.name]: module.reducer }), {})
    });

  // Create the store
  storeInstance = createStore(rootReducer(), initialState, composedEnhancers);

  sagaMiddleware.run(function*() {
    for (let mod of modules.filter(mod => mod.sagas)) {
      yield spawn(mod.sagas);
    }
  });

  return storeInstance;
};
