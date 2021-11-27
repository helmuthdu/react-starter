import { SignIn } from '@/modules/user/components/sign-in/sign-in.component';
import { isLoggedInSelector, userState, useSignIn } from '@/modules/user/stores/user.store';
import { useAddNotification } from '@/stores/notification.store';
import React, { Fragment, SyntheticEvent, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Subject } from 'rxjs';

export const SignInRoute = () => {
  const isLoggedIn = useRecoilValue(isLoggedInSelector);
  const user = useRecoilValue(userState);
  const signIn = useSignIn();
  const addNotification = useAddNotification();

  const username$ = new Subject<string>();

  useEffect(() => {
    if (!isLoggedIn) {
      signIn({ email: 'johndoe@mail.com', password: 'secret' });
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
      <SignIn onSubmit={(values: any) => console.log(values)} onChange={handleChange} onClick={handleClick} />
      User: {user.entity.userName}
    </Fragment>
  );
};

export default SignInRoute;