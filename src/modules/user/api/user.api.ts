import { Http } from '../../../utils/http.util';
import { UserSchema } from '../models/user';

export type UserRequest = Partial<UserSchema> & {
  email: string;
  password: string;
};

const signIn = async (payload: UserRequest): Promise<Partial<Response> & { data: UserSchema; error?: unknown }> =>
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

const signUp = async (payload: UserRequest) =>
  Http.post<UserSchema>({ url: `${process.env.REACT_APP_IDENTITY_URL}/users/sign-up`, body: payload });

const update = async (payload: UserRequest) =>
  Http.put<UserSchema>({ url: `${process.env.REACT_APP_IDENTITY_URL}/users`, body: payload });

export const userApi = {
  signIn,
  signUp,
  update
};
