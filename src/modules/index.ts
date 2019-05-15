import * as userModule from './user';

export type State = userModule.State;

export const stores = [...userModule.stores];
