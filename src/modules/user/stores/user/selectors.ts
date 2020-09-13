import moize from 'moize';
import { State } from './state';

export const getUserName = moize(
  (state: State) => {
    console.log('getUserName');
    return state.userName;
  },
  { isDeepEqual: true }
);

export const isLoggedIn = moize((state: State) => !!state.token, { isDeepEqual: true });
