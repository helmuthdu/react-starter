import { State } from '../store/modules/auth';
import fetch from 'isomorphic-unfetch';

export type AuthRequest = {
  email: string;
  password: string;
};

const get = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@mail.com',
        isLogged: true,
        token: 'secret'
      } as State);
    }, 1000);
  });

const post = (payload: AuthRequest) =>
  fetch(`https://httpstat.us/200`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: payload.email,
      password: payload.password
    })
  });

export const authApi = {
  get,
  post
};
