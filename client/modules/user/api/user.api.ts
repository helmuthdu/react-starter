import { State } from '../stores/modules/user';
import fetch from 'isomorphic-unfetch';

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
  fetch(`https://httpstat.us/200`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: payload.email,
      password: payload.password
    })
  }).then((res: Response) => res.body as any);

export const userApi = {
  get,
  post
};
