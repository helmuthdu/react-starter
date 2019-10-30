import React, { Fragment, SyntheticEvent, useEffect } from 'react';
import { Subject } from 'rxjs';
import { useStore } from '../../../../contexts/store/store.context';
import { SignIn } from '../../components/sign-in/sign-in';
import { actionGetUser, getUserName } from '../../stores/modules/user';

export const SignInRoute = () => {
  const [{ user }, dispatch] = useStore();

  const username$ = new Subject<string>();

  useEffect(() => {
    if (!user.isLogged) {
      dispatch(actionGetUser());
    }
  }, [dispatch]);

  const handleClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
  };

  const handleChange = (evt: SyntheticEvent<HTMLInputElement>) => {
    evt.preventDefault();
    username$.next(evt.currentTarget.value);
  };

  return (
    <Fragment>
      <SignIn onSubmit={values => console.log(values)} onChange={handleChange} onClick={handleClick} />
      User: {getUserName(user)}
    </Fragment>
  );
};

export default SignInRoute;
