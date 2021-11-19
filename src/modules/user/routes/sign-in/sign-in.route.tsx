import React, { Fragment, SyntheticEvent, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Subject } from 'rxjs';
import { addNotificationAction, notificationState } from '../../../../stores/notification.store';
import { SignIn } from '../../components/sign-in/sign-in';
import { isLoggedInSelector, signInAction, userState } from '../../stores/user.store';

export const SignInRoute = () => {
  const isLoggedIn = useRecoilValue(isLoggedInSelector);
  const [user, setUser] = useRecoilState(userState);
  const [, setNotifications] = useRecoilState(notificationState);

  const username$ = new Subject<string>();

  useEffect(() => {
    if (!isLoggedIn) {
      signInAction({ email: 'mail@mail.com', password: 'secrete' }, setUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    addNotificationAction({ message: 'message' }, setNotifications);
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
