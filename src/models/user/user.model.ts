import type { UserJSON, UserRole } from './user.type';

export class User implements UserJSON {
  readonly email!: string;
  readonly emailVerified?: boolean;
  readonly facebookId?: string;
  readonly googleId?: string;
  readonly id?: string;
  readonly password?: string;
  readonly phoneNumber?: string;
  readonly phoneNumberVerified?: boolean;
  readonly roles!: UserRole[];
  readonly token?: string;
  readonly userName?: string;

  static create(json?: UserJSON) {
    return Object.assign({}, new User(), { ...(json ?? {}) }) as User;
  }
}
