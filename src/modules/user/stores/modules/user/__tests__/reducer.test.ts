import { ActionType, initialState, reducer } from '..';

describe('auth/store -> reducer', () => {
  it('should handle the initial state', () => {
    expect(reducer(initialState, {} as any)).toEqual(initialState);
  });

  it(`should handle ${ActionType.USER_SET_USER}: login`, () => {
    const res = reducer(initialState, {
      type: ActionType.USER_SET_USER,
      payload: {
        name: 'John Doe',
        username: 'user_name',
        email: 'user_email',
        isLogged: true,
        token: 'user_token'
      }
    });
    expect(res.isLogged).toEqual(true);
  });

  it(`should handle ${ActionType.USER_SET_USER}: logout`, () => {
    const res = reducer(initialState, {
      type: ActionType.USER_SET_USER,
      payload: { ...initialState }
    });
    expect(res).toEqual(initialState);
  });
});
