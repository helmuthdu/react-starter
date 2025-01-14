import { SignIn } from '@/modules/user/components/sign-in/sign-in';
import { useNotificationStore } from '@/stores/notification.store';
import { useStore } from '@/stores/user.store';
import { Fragment, type SyntheticEvent, useEffect } from 'react';

export const SignInRoute = () => {
  const { user, signIn, isLoggedIn } = useStore();
  const notifier = useNotificationStore();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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
      <SignIn onChange={handleChange} onClick={handleClick} onSubmit={(values) => console.log(values)} />
      User: {user.data.userName}
    </Fragment>
  );
};

export default SignInRoute;
