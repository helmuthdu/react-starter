import axios from 'axios';

const get = () =>
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

const post = payload =>
  axios.post(`https://httpstat.us/200`, {
    username: payload.email,
    password: payload.password
  });

export const authApi = {
  get,
  post
};
