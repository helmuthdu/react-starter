import React, { Fragment, SyntheticEvent } from 'react';
import { useRecoilState } from 'recoil';
import { Subject } from 'rxjs';
import { notificationAddMessage, notificationState } from '../../../../stores/notification.store';
import { SignIn } from '../../components/sign-in/sign-in';

export const SignInRoute = () => {
  // const user = new User();
  const [, setNotifications] = useRecoilState(notificationState);

  const username$ = new Subject<string>();

  // useEffect(() => {
  //   if (!user.isLogged) {
  //     dispatch(actionGetUser());
  //   }
  // }, [user, dispatch]);

  const handleClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    notificationAddMessage({ message: 'message' }, setNotifications);
  };

  const handleChange = (evt: SyntheticEvent<HTMLInputElement>) => {
    evt.preventDefault();
    username$.next(evt.currentTarget.value);
  };

  return (
    <Fragment>
      <SignIn onSubmit={values => console.log(values)} onChange={handleChange} onClick={handleClick} />
      {/*User: {getUserName(user)}*/}
    </Fragment>
  );
};

export default SignInRoute;
