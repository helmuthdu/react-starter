import React, { Fragment, SyntheticEvent, useEffect } from 'react';
import { Subject } from 'rxjs';
import { useDispatch, useSelector, useStore } from '../../../../stores';
import { addNotificationAction } from '../../../../stores/modules/notifications.store';
import { SignIn } from '../../components/sign-in/sign-in';
import { isLoggedInSelector, signInAction, userNameSelector } from '../../stores/user.store';

export const SignInRoute = () => {
  const store = useStore();
  const userName = useSelector(userNameSelector);
  const isLoggedIn = useSelector(isLoggedInSelector);
  const dispatch = useDispatch();

  const username$ = new Subject<string>();

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(signInAction({ email: 'email@mail.com', password: '1234' }));
    }

    console.log('STORE', store.getState());
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
