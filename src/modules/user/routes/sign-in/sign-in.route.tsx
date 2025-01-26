import { SignIn } from '@/modules/user/components/sign-in/sign-in';
import { useStore } from '@/stores';
import { Fragment, type SyntheticEvent, useEffect } from 'react';

export const SignInRoute = () => {
  const { user: userStore, notifications: notificationStore } = useStore();

  // biome-ignore lint/correctness/useExhaustiveDependencies: -
  useEffect(() => {
    if (!userStore.getters.isLoggedIn) {
      userStore.actions.signIn({ email: 'mail@mail.com', password: 'secrete' });
    }
  }, []);

  const handleClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    notificationStore.actions.add({ message: 'message' });
  };

  const handleChange = (evt: SyntheticEvent<HTMLInputElement>) => {
    evt.preventDefault();
  };

  return (
    <Fragment>
      <SignIn
        onChange={handleChange}
        onClick={handleClick}
        onSubmit={(values) => console.log(values)}
        pending={userStore.getters.isPending}
      />
      User: {userStore.state.data.userName}
    </Fragment>
  );
};

export default SignInRoute;
