import { actionSignIn, getUserName, isLoggedIn } from '@/modules/user/stores/user';
import { useStore } from '@/stores';
import { Fragment, SyntheticEvent, useEffect } from 'react';
import { Subject } from 'rxjs';
import { SignIn } from '../../components/sign-in/sign-in.component';

export const SignInPage = () => {
  const [{ user }, dispatch] = useStore();

  const username$ = new Subject<string>();

  useEffect(() => {
    if (!isLoggedIn(user)) {
      dispatch(actionSignIn({ email: 'email@mail.com' }));
    }
  }, [user, dispatch]);

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

export default SignInPage;
