import { Http } from '../../../utils';
import { UserScheme } from '../models/user';

export interface UserRequest {
  email: string;
  password: string;
}

const get = (): Promise<UserScheme> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@mail.com',
        isLogged: true,
        token: 'secret'
      });
    }, 1000);
  });

const post = async (payload: UserRequest): Promise<UserScheme> =>
  (await Http.post<UserScheme>({ url: '/users', body: payload })).data;

export const userApi = {
  get,
  post
};
