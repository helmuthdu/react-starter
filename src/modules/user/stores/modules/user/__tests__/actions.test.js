import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import { actions, ActionTypes } from '..';

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
    const response = {
      name: 'John Doe',
      isLogged: true,
      username: 'johndoe',
      email: 'johndoe@mail.com',
      token: '123456'
    };

    httpMock.onPost('https://httpstat.us/200').reply(200, response);

    actions.actionLogin({ email: 'johndoe@mail.com', password: 'secret' })(store.dispatch);

    await flushAllPromises();

    expect(store.getActions()).toEqual([
      {
        type: ActionTypes.USER_SET_USER,
        payload: { ...response }
      }
    ]);
  });
});
