import moize from 'moize';
import { State } from './state';

export const getNotification = moize((state: State) => state, { isDeepEqual: true });
