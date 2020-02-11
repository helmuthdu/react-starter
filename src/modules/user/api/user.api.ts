import { Http } from '../../../utils/http.util';
import { State } from '../stores/modules/user';

export interface UserRequest {
  email: string;
  password: string;
}

const get = (): Promise<State> =>
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

const post = (payload: UserRequest) => Http.post({ url: '/users' });

export const userApi = {
  get,
  post
};
