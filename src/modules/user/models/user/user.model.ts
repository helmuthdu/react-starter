import { UserScheme } from './user.scheme';

export class User implements UserScheme {
  name: '';
  username: '';
  email: '';
  isLogged: false;
  token: '';
}
