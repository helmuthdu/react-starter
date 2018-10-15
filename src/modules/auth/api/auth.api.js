// @flow
import axios from 'axios';

type GetPayload = {
  email: string,
  password: string
};

const get = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@mail.com'
      });
    }, 1000);
  });

const post = (payload: GetPayload) =>
  axios.post(`https://httpstat.us/200`, {
    username: payload.email,
    password: payload.password
  });

export const authApi = {
  get,
  post
};
