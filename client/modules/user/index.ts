import * as storesModule from './stores';

export type State = storesModule.State;

export const stores = Object.values(storesModule);
