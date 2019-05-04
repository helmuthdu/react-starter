import * as authModule from './auth';

export type State = authModule.State;

export const stores = [...authModule.stores];
