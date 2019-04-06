export type State = Readonly<{
  name: string;
  username: string;
  email: string;
  isLogged: boolean;
  token: string;
}>;

export const initialState: State = {
  name: '',
  username: '',
  email: '',
  isLogged: false,
  token: ''
};
