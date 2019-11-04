import moize from 'moize';
import { State } from './state';

export const getUserName = moize(
  (state: State) => {
    console.log('getUserName');
    return state.username;
  },
  { isDeepEqual: true }
);
