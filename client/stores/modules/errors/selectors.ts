import moize from 'moize';
import { AppState } from '../../index';

export const getErrors = moize((state: AppState) => state.errors, { isDeepEqual: true });
