import { Fragment, SyntheticEvent, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { SignIn } from '@/modules/user/components/sign-in/sign-in';
import { isLoggedInSelector, userState, useSignIn } from '@/modules/user/stores/user.store';
import { useNotifier } from '@/stores/notification.store';

export const SignInRoute = () => {
  const isLoggedIn = useRecoilValue(isLoggedInSelector);
  const user = useRecoilValue(userState);
  const signIn = useSignIn();
  const notifier = useNotifier();

  useEffect(() => {
    if (!isLoggedIn) {
      signIn({ email: 'mail@mail.com', password: 'secrete' });
    }
  }, []);

  const handleClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    notifier.add({ message: 'message' });
  };

  const handleChange = (evt: SyntheticEvent<HTMLInputElement>) => {
    evt.preventDefault();
  };

  return (
    <Fragment>
      <SignIn onSubmit={values => console.log(values)} onChange={handleChange} onClick={handleClick} />
      User: {user.entity.userName}
    </Fragment>
  );
};

export default SignInRoute;
