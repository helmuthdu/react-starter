import * as storesModule from './stores';

export { routes } from './routes';

export type State = storesModule.State;

export const stores = Object.values(storesModule);
