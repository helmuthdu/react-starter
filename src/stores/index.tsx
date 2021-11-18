import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
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

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
