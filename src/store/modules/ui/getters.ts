import { State } from './state';

export const isLoading = (state: State) => state.loading > 0;
