import React, { SyntheticEvent } from 'react';
import { Subject } from 'rxjs';
import { SignIn } from '../../components/sign-in/sign-in.component';

export const SignInPage = () => {
  const username$ = new Subject<string>();

  const handleClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
  };

  const handleChange = (evt: SyntheticEvent<HTMLInputElement>) => {
    evt.preventDefault();
    username$.next(evt.currentTarget.value);
  };

  return <SignIn onSubmit={values => console.log(values)} onChange={handleChange} onClick={handleClick} />;
};

export default SignInPage;
