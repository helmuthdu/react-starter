type errors = 'signInNotFound' | 'signInWrongInput' | 'signUpAlreadyExists';

export type State = Readonly<Record<errors, boolean | string>>;

export const initialState = {} as State;
