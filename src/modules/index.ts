import * as authModule from './auth';
import * as rootModule from './root';

export type State = authModule.State;

export const routes = { ...rootModule.routes, ...authModule.routes };
export const stores = [...authModule.stores];
