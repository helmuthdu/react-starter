import React, { Fragment, SyntheticEvent, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Subject } from 'rxjs';
import { useAddNotification } from '../../../../stores/notification.store';
import { SignIn } from '../../components/sign-in/sign-in';
import { isLoggedInSelector, userState, useSignIn } from '../../stores/user.store';

export const SignInRoute = () => {
  const isLoggedIn = useRecoilValue(isLoggedInSelector);
  const user = useRecoilValue(userState);
  const signIn = useSignIn();
  const addNotification = useAddNotification();

  const username$ = new Subject<string>();

  useEffect(() => {
    if (!isLoggedIn) {
      signIn({ email: 'mail@mail.com', password: 'secrete' });
    }
  }, []);

  const handleClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    addNotification({ message: 'message' });
  };

  const handleChange = (evt: SyntheticEvent<HTMLInputElement>) => {
    evt.preventDefault();
    username$.next(evt.currentTarget.value);
  };

  return (
    <Fragment>
      <SignIn onSubmit={values => console.log(values)} onChange={handleChange} onClick={handleClick} />
      User: {user.entity.userName}
    </Fragment>
  );
};

export default SignInRoute;
