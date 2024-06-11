import type { UserJSON } from '@/modules/user/models/user/user.type';
import { Http, type HttpResponse } from '@/utils';

export type UserRequestPayload = Partial<UserJSON> & {
  email: string;
  password: string;
};

const signIn = async (payload: UserRequestPayload): Promise<HttpResponse<UserJSON>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: true,
        status: 400,
        data: {
          userName: 'johndoe',
          email: payload.email,
          token: 'secret',
        },
      });
    }, 1000);
  });

const signUp = async (payload: UserRequestPayload) =>
  Http.post<UserJSON>(`${import.meta.env.VITE_IDENTITY_URL}/users/sign-up`, { body: payload });

const update = async (payload: UserRequestPayload) =>
  Http.put<UserJSON>(`${import.meta.env.VITE_IDENTITY_URL}/users`, { body: payload });

export const usersApi = {
  signIn,
  signUp,
  update,
};
