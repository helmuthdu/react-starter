export type UserRole = 'admin' | 'moderator' | 'user';

export type UserJSON = {
  email: string;
  emailVerified?: boolean;
  facebookId?: string;
  googleId?: string;
  id?: string;
  newsletter?: boolean;
  password?: string;
  phoneNumber?: string;
  phoneNumberVerified?: boolean;
  roles: UserRole[];
  token?: string;
  userName?: string;
};
