import moize from 'moize';
import { State } from './state';

export const getCurrentLocale = moize((state: State) => state.language, { isDeepEqual: true });
