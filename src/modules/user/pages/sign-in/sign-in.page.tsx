import { Fragment, SyntheticEvent } from 'react';
import { Subject } from 'rxjs';
import { SignIn } from '../../components/sign-in/sign-in.component';

export const SignInPage = () => {
  const username$ = new Subject<string>();

  // useEffect(() => {
  //   if (!isLoggedIn(user)) {
  //     dispatch(actionSignIn({ email: 'email@mail.com' }));
  //   }
  // }, [user, dispatch]);

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
    </Fragment>
  );
};

export default SignInPage;
