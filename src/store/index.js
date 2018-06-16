import { anchorate } from 'anchorate';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './modules';

export const history = createHistory({ basename: process.env.PUBLIC_URL });

history.listen(() => {
  anchorate();
});

const initialState = {};
const enhancers = [];
const middleware = [thunkMiddleware, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
  middleware.push(reduxImmutableStateInvariant());

  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

export default createStore(rootReducer, initialState, composedEnhancers);
