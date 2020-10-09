import { waitFor } from '@testing-library/dom';
import configureMockStore, { MockStore } from 'redux-mock-store';
import { actions, ActionTypes, State } from '..';

describe('auth/store -> actions', () => {
  let store: MockStore;

  beforeEach(() => {
    // @ts-ignore
    fetch.resetMocks();
    const mockStore = configureMockStore();
    store = mockStore({});
  });

  it('should login successfully', async () => {
    const response: State = {
      userName: 'John Doe',
      email: 'johndoe@mail.com',
      token: '123456'
    };

    // @ts-ignore
    fetch.mockResponse(JSON.stringify(response));

    await waitFor(() => actions.actionSignUp({ email: 'johndoe@mail.com', password: 'secret' })(store.dispatch) as any);

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
