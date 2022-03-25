import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as _useDispatch,
  useSelector as _useSelector,
  useStore as _useStore
} from 'react-redux';
import logger from 'redux-logger';
import * as appModules from '../modules';
import * as rootModules from './modules';

export type AppState = rootModules.State & appModules.State;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const store = configureStore({
  reducer: {
    ...rootModules.reducer,
    ...appModules.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
});

export const useStore = () => _useStore<AppState>();
export const useDispatch = () => _useDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;
