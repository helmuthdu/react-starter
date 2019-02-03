import axios from 'axios';
import { State } from '../store/modules/auth';

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
  axios.post(`https://httpstat.us/200`, {
    username: payload.email,
    password: payload.password
  });

export const authApi = {
  get,
  post
};
