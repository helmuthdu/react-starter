import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { uiReducer } from './ui';

export default combineReducers({
  router: routerReducer,
  ui: uiReducer
});
