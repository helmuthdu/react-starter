import React, { Fragment, SyntheticEvent, useEffect } from 'react';
import { Subject } from 'rxjs';
import { useAppDispatch, useAppSelector } from '../../../../stores';
import { actionAddNotification } from '../../../../stores/modules/notification.store';
import { SignIn } from '../../components/sign-in/sign-in';
import { actionSignIn, selectorUserName, selectorIsLoggedIn } from '../../stores/user.store';

export const SignInRoute = () => {
  const userName = useAppSelector(selectorUserName);
  const isLoggedIn = useAppSelector(selectorIsLoggedIn);
  const dispatch = useAppDispatch();

  const username$ = new Subject<string>();

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(actionSignIn({ email: 'email@mail.com' }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(actionAddNotification({ message: 'message' }));
  };

  const handleChange = (evt: SyntheticEvent<HTMLInputElement>) => {
    evt.preventDefault();
    username$.next(evt.currentTarget.value);
  };

  return (
    <Fragment>
      <SignIn onSubmit={values => console.log(values)} onChange={handleChange} onClick={handleClick} />
      User: {userName}
    </Fragment>
  );
};

export default SignInRoute;
