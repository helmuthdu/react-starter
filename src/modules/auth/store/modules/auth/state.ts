export type State = {
  readonly name: string;
  readonly username: string;
  readonly email: string;
  readonly isLogged: boolean;
  readonly token: string;
};

export const initialState: State = {
  name: '',
  username: '',
  email: '',
  isLogged: false,
  token: ''
};
