import { Http } from '../../../utils/api.util';

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

const post = payload => Http.post({ url: '/users' });

export const userApi = {
  get,
  post
};
