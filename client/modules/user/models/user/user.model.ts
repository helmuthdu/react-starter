import { IUser } from './user.interface';

export class User implements IUser {
  name: '';
  username: '';
  email: '';
  isLogged: false;
  token: '';
}
