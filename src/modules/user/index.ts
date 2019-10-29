import * as storesModule from './stores';

export { routes } from './routes';

export type State = storesModule.State;

export type Action = storesModule.Action;

export type Mutations = storesModule.Mutations;

export const stores = storesModule;
