import React, { Fragment, SyntheticEvent, useEffect } from 'react';
import { Subject } from 'rxjs';
import { useAppDispatch, useAppSelector } from '../../../../stores';
import { addNotificationAction } from '../../../../stores/modules/notifications.store';
import { SignIn } from '../../components/sign-in/sign-in';
import { isLoggedInSelector, signInAction, userNameSelector } from '../../stores/user.store';

export const SignInRoute = () => {
  const userName = useAppSelector(userNameSelector);
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const dispatch = useAppDispatch();

  const username$ = new Subject<string>();

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(signInAction({ email: 'email@mail.com', password: '1234' }));
    }
  }, []);

  const handleClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(addNotificationAction({ message: 'message' }));
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
