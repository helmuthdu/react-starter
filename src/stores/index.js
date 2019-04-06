import { anchorate } from 'anchorate';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, spawn } from 'redux-saga/effects';
import thunkMiddleware from 'redux-thunk';

export const isServer = !(typeof window !== 'undefined' && window.document && window.document.createElement);

let storeInstance;

export default (modules = [], url = process.env.PUBLIC_URL || '/') => {
  if (storeInstance) {
    return storeInstance;
  }

  // Create a history depending on the environment
  const history = isServer
    ? createMemoryHistory({
        initialEntries: [url]
      })
    : createBrowserHistory({
        basename: url
      });

  history.listen(() => {
    anchorate();
  });

  // Do we have preloaded state available? Great, save it.
  const initialState = !isServer ? window.__PRELOADED_STATE__ : {};
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [thunkMiddleware, sagaMiddleware, routerMiddleware(history)];
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

  const rootReducer = hist =>
    combineReducers({
      router: connectRouter(hist),
      ...modules.filter(mod => mod.reducer).reduce((acc, mod) => ({ ...acc, [mod.name]: mod.reducer }), {})
    });

  // Create the store
  const store = createStore(rootReducer(history), initialState, composedEnhancers);

  sagaMiddleware.run(function*() {
    yield all(modules.filter(mod => mod.sagas).map(mod => spawn(mod.sagas)));
  });

  storeInstance = {
    store,
    history
  };

  return storeInstance;
};
