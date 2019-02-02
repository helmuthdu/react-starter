import { anchorate } from 'anchorate';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory, History } from 'history';
import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';

export const isServer = !(typeof window !== 'undefined' && window.document && window.document.createElement);

type StoreInstance = {
  store: Store;
  history: History;
};

let storeInstance: StoreInstance;

export default (modules: any[] = [], url: string = process.env.PUBLIC_URL || '/') => {
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
  const initialState = !isServer ? (window as any).__PRELOADED_STATE__ : {};
  const enhancers = [];
  const middleware = [thunkMiddleware, routerMiddleware(history)];

  if (process.env.NODE_ENV === 'development' && !isServer) {
    const devToolsExtension = (window as any).devToolsExtension;

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

  const rootReducer = (history: History) =>
    combineReducers({
      router: connectRouter(history),
      ...modules.reduce((acc, module: any) => ({ ...acc, [module.name]: module.reducer }), {})
    });

  // Create the store
  const store = createStore(rootReducer(history), initialState, composedEnhancers);

  storeInstance = {
    store,
    history
  };

  return storeInstance;
};
