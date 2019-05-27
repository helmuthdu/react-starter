import * as React from 'react';
import { Field } from 'redux-form';

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (evt: React.MouseEvent) => void;
  name: string;
};

export const SignIn = (props: Props) => (
  <form onSubmit={props.onSubmit}>
    <Field component="input" type="text" placeholder="Username" name="username" onChange={props.onChange} required />
    <Field component="input" type="password" placeholder="Password" name="password" required />
    <button type="submit" onClick={props.onClick}>
      Login
    </button>
    <p>current user: {props.name}</p>
  </form>
);
