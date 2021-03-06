import React, { Fragment, useEffect } from 'react';
import { Subject } from 'rxjs';
import { useStore } from '../../../../stores';
import { actionAddNotification } from '../../../../stores/modules/notification';
import { SignIn } from '../../components/sign-in/sign-in';
import { actionGetUser, getUserName } from '../../stores/user';

export const SignInRoute = () => {
  const [{ user }, dispatch] = useStore();

  const username$ = new Subject();

  useEffect(() => {
    if (!user.isLogged) {
      dispatch(actionGetUser());
    }
  }, [user, dispatch]);

  const handleClick = evt => {
    evt.preventDefault();
    dispatch(actionAddNotification({ message: 'message' }));
  };

  const handleChange = evt => {
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
