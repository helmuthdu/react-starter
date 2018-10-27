// @flow
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import { doLogin } from '../actions';
import { State } from '../state';
import { AUTH_SET_USER } from '../types';

describe('auth/store -> actions', () => {
  let store;
  let httpMock;

  const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

  beforeEach(() => {
    httpMock = new MockAdapter(axios);
    const mockStore = configureMockStore();
    store = mockStore({});
  });

  it('should login successfully', async () => {
    const response: State = {
      name: 'John Doe',
      username: 'johndoe',
      email: 'johndoe@mail.com',
      token: '123456'
    };

    httpMock.onPost('https://httpstat.us/200').reply(200, response);

    doLogin({ email: 'johndoe@mail.com', password: 'secret' })(store.dispatch);

    await flushAllPromises();

    expect(store.getActions()).toEqual([
      {
        type: AUTH_SET_USER,
        payload: { ...response, isLogged: true }
      }
    ]);
  });
});
