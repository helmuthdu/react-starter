// @flow
export interface State {
  username: string;
  email: string;
  isLogged: boolean;
  token: string;
}

export const initialState: State = {
  username: '',
  email: '',
  isLogged: false,
  token: ''
};
