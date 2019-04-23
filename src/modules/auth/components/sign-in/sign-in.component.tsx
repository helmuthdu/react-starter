import React from 'react';

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  ref: React.RefObject<HTMLInputElement>;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (evt: React.MouseEvent) => void;
  name: string;
};

export const SignIn = (props: Props) => (
  <form onSubmit={props.onSubmit}>
    <input ref={props.ref} type="text" placeholder="Username" onChange={props.onChange} required />
    <input type="password" placeholder="Password" required />
    <button type="submit" onClick={props.onClick}>
      Login
    </button>
    <p>current user: {props.name}</p>
  </form>
);
