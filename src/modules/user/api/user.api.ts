import { Http, HttpResponse } from '../../../utils';
import { UserSchema } from '../types/user.type';

export type UserRequestPayload = Partial<UserSchema> & {
  email: string;
  password: string;
};

const signIn = async (payload: UserRequestPayload): Promise<HttpResponse<UserSchema>> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        ok: true,
        status: 400,
        data: {
          userName: 'johndoe',
          email: payload.email,
          token: 'secret'
        }
      } as any);
    }, 1000);
  });

const signUp = async (payload: UserRequestPayload) =>
  Http.post<UserSchema>(`${import.meta.env.REACT_APP_IDENTITY_URL}/users/sign-up`, { body: payload });

const update = async (payload: UserRequestPayload) =>
  Http.put<UserSchema>(`${import.meta.env.REACT_APP_IDENTITY_URL}/users`, { body: payload });

export const usersApi = {
  signIn,
  signUp,
  update
};
