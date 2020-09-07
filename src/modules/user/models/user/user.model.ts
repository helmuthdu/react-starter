import { UserScheme } from './user.interface';

export class User implements UserScheme {
  name: '';
  username: '';
  email: '';
  isLogged: false;
  token: '';
}
