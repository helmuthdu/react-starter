import type { UserJSON } from '@/models/user/user.type';
import { Http, type RequestResponse } from '@/utils/http.util';

export type UserRequestPayload = Partial<UserJSON> & {
  email: string;
  password: string;
};

const signIn = async (payload: UserRequestPayload): Promise<RequestResponse<UserJSON>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: true,
        status: 400,
        data: {
          userName: 'johndoe',
          email: payload.email,
          token: 'secret',
          roles: ['user'],
        } satisfies UserJSON,
      });
    }, 1000);
  });

const signUp = async (payload: UserRequestPayload) =>
  Http.post<UserJSON>(`${import.meta.env.VITE_IDENTITY_URL}/users/sign-up`, { body: payload });

const update = async (payload: UserRequestPayload) =>
  Http.put<UserJSON>(`${import.meta.env.VITE_IDENTITY_URL}/users`, { body: payload });

export const userApi = {
  signIn,
  signUp,
  update,
};
