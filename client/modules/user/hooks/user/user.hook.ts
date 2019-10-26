import { useState } from 'react';
import { IUser, User } from '../../models/user';

export const useUser = () => {
  const [user, setUser] = useState<IUser>(new User());

  return { user, setUser };
};
