import configureMockStore from 'redux-mock-store';
import { actions, ActionTypes } from '..';

describe('auth/store -> actions', () => {
  let store;

  const wait = () => new Promise(resolve => setImmediate(resolve));

  beforeEach(() => {
    fetch.resetMocks();
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

    fetch.mockResponse(JSON.stringify(response));

    actions.actionLogin({ email: 'johndoe@mail.com', password: 'secret' })(store.dispatch);

    await wait();

    expect(fetch.mock.calls.length).toEqual(1);
    expect(store.getActions()).toEqual([
      {
        type: ActionTypes.USER_SET_USER,
        payload: { ...response }
      }
    ]);
  });
});
