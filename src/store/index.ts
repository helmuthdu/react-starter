import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux';
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
  const enhancers = [];
  const middleware = [thunkMiddleware];

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

  const rootReducer = () =>
    combineReducers({
      ...modules.reduce((acc, module: any) => ({ ...acc, [module.name]: module.reducer }), {})
    });

  // Create the store
  storeInstance = createStore(rootReducer(), initialState, composedEnhancers);

  return storeInstance;
};
