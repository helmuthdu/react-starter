import { Http } from '@/utils';
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

const post = (payload: UserRequest): Promise<State> =>
  Http.post({
    url: `https://httpstat.us/200`,
    body: JSON.stringify({
      username: payload.email,
      password: payload.password
    })
  }).then((res: Response) => res.body as any);

export const userApi = {
  get,
  post
};
