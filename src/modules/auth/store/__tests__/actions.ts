import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore, { MockStore } from 'redux-mock-store';
import { doLogin } from '../modules/auth/actions';
import { State } from '../modules/auth/state';
import { ActionType } from '../modules/auth/types';

describe('auth/store -> actions', () => {
  let store: MockStore;
  let httpMock: MockAdapter;

  const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

  beforeEach(() => {
    httpMock = new MockAdapter(axios);
    const mockStore = configureMockStore();
    store = mockStore({});
  });

  it('should login successfully', async () => {
    const response: State = {
      isLogged: true,
      username: 'johndoe',
      email: 'johndoe@mail.com',
      token: '123456'
    };

    httpMock.onPost('https://httpstat.us/200').reply(200, response);

    doLogin({ email: 'johndoe@mail.com', password: 'secret' })(store.dispatch);

    await flushAllPromises();

    expect(store.getActions()).toEqual([
      {
        type: ActionType.AUTH_SET_USER,
        payload: { ...response }
      }
    ]);
  });
});
