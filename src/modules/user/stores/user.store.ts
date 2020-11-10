import { atom, RecoilState, selector } from 'recoil';
import { User, UserSchema } from '../models/user';

const STORE_ID = 'User';

export type UserState = UserSchema;

export const userState: RecoilState<UserState> = atom({
  key: STORE_ID,
  default: JSON.parse(localStorage.getItem(STORE_ID) ?? JSON.stringify(User.create()))
});

export const userStore = selector<UserState>({
  key: 'UserStore',
  get: ({ get }) => {
    return get(userState);
  },
  set: ({ set }, payload) => {
    set(userState, () => {
      const user = User.create(payload as UserSchema);
      localStorage.setItem(STORE_ID, JSON.stringify(user));
      return user;
    });
  }
});
