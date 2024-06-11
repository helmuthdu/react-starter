import type { UserJSON } from './user.type.ts';

export class User implements UserJSON {
  readonly id?: number;
  readonly email!: string;
  readonly emailVerified?: boolean;
  readonly password?: string;
  readonly phoneNumber?: string;
  readonly phoneNumberVerified?: boolean;
  readonly userName?: string;
  readonly googleId?: string;
  readonly facebookId?: string;
  readonly token?: string;

  static create(json?: UserJSON) {
    return Object.assign({}, new User(), { ...(json ?? {}) }) as User;
  }
}
