import { UserSchema } from './user.schema';

export class User implements UserSchema {
  readonly email: string;
  readonly emailVerified: boolean;
  readonly id?: number;
  readonly password: string;
  readonly phoneNumber?: string;
  readonly phoneNumberVerified: boolean;
  readonly userName: string;
  readonly googleId?: string;
  readonly facebookId?: string;
  readonly token?: string;

  static create(user: UserSchema) {
    return Object.assign({}, new User(), { ...user });
  }
}
