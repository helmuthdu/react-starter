import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, spawn } from 'redux-saga/effects';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

declare const window: Window & {
  __PRELOADED_STATE__: object;
  __REDUX_DEVTOOLS_EXTENSION__: object;
};

export const isServer = !(typeof window !== 'undefined' && window.document && window.document.createElement);

type StoreInstance = Store;

let storeInstance: StoreInstance;

// eslint-disable-next-line
export default (stores: { name: string; sagas?: any; reducer?: object }[] = []) => {
  if (storeInstance) {
    return storeInstance;
  }

  // Do we have preload state available? Great, save it.
  const initialState = !isServer ? window.__PRELOADED_STATE__ : {};
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [thunkMiddleware, sagaMiddleware];
  const enhancers = [];

  if (process.env.NODE_ENV === 'development' && !isServer) {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

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
    delete window.__PRELOADED_STATE__;
  }

  const rootReducer = () =>
    combineReducers({
      form: formReducer,
      ...stores.filter(str => str.reducer).reduce((acc, str) => ({ ...acc, [str.name]: str.reducer }), {})
    });

  // Create the store
  storeInstance = createStore(rootReducer(), initialState, composedEnhancers);

  sagaMiddleware.run(function*() {
    yield all(stores.filter(str => str.sagas).map(str => spawn(str.sagas)));
  });

  return storeInstance;
};
