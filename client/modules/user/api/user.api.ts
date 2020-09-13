import { Http } from '../../../utils/http.util';
import { UserSchema } from '../models/user/user.interface';

export type UserRequest = Partial<UserSchema> & {
  email: string;
  password: string;
};

const signIn = async (payload: UserSchema): Promise<Partial<Response> & { data: UserSchema; error?: unknown }> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        ok: true,
        status: 400,
        data: {
          userName: 'johndoe',
          email: 'johndoe@mail.com',
          token: 'secret'
        }
      });
    }, 1000);
  });

const signUp = async (payload: UserSchema) =>
  Http.post<UserSchema>({ url: `${process.env.REACT_APP_IDENTITY_URL}/users/sign-up`, body: payload });

const update = async (payload: UserSchema) =>
  Http.put<UserSchema>({ url: `${process.env.REACT_APP_IDENTITY_URL}/users`, body: payload });

export const usersApi = {
  signIn,
  signUp,
  update
};
