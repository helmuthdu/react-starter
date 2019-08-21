import configureMockStore, { MockStore } from 'redux-mock-store';
import { actions, ActionTypes, State } from '..';

describe('auth/store -> actions', () => {
  let store: MockStore;

  const wait = () => new Promise(resolve => setImmediate(resolve));

  beforeEach(() => {
    // @ts-ignore
    fetch.resetMocks();
    const mockStore = configureMockStore();
    store = mockStore({});
  });

  it('should login successfully', async () => {
    const response: State = {
      name: 'John Doe',
      isLogged: true,
      username: 'johndoe',
      email: 'johndoe@mail.com',
      token: '123456'
    };

    // @ts-ignore
    fetch.mockResponse(JSON.stringify(response));

    actions.actionLogin({ email: 'johndoe@mail.com', password: 'secret' })(store.dispatch);

    await wait();

    // @ts-ignore
    expect(fetch.mock.calls.length).toEqual(1);
    expect(store.getActions()).toEqual([
      {
        type: ActionTypes.USER_SET_USER,
        payload: { ...response }
      }
    ]);
  });
});
