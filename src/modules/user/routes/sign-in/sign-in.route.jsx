import React from 'react';
import { Subject } from 'rxjs';
import { SignIn } from '../../components/sign-in/sign-in.component';

export const SignInRoute = () => {
  const username$ = new Subject();

  const handleClick = evt => {
    evt.preventDefault();
  };

  const handleChange = evt => {
    evt.preventDefault();
    username$.next(evt.currentTarget.value);
  };

  return <SignIn onSubmit={values => console.log(values)} onChange={handleChange} onClick={handleClick} />;
};

export default SignInRoute;
