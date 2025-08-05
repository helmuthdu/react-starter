import { computed, map, task } from 'nanostores';
import { type UserRequestPayload, userApi } from '../../../api';
import { User, type UserJSON } from '../../../models/user';
import { type RequestErrorType, RequestStatus } from '../../../utils/http.util';
import { Storage } from '../../../utils/storage.util';
import { createReactStore, createStore } from '../../../utils/store.util';

export type State = {
  data: UserJSON;
  status: (typeof RequestStatus)[keyof typeof RequestStatus];
  error?: (typeof RequestErrorType)[keyof typeof RequestErrorType];
};

export const name = 'user' as const;

const initialState: State = Storage.getItem<State>(name, {
  defaultValue: {
    data: User.create(),
    error: undefined,
    status: RequestStatus.PENDING,
  } satisfies State,
  parser: (state) => ({
    ...state,
    data: User.create(state.data),
  }),
});

const state = map<State>(initialState);

const getters = {
  isLoggedIn: computed(state, (s) => !!s.data.token),
  isPending: computed(state, (s) => s.status === RequestStatus.PENDING),
  isRegistered: computed(state, () =>
    task(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(false);
          }, 1000);
        }),
    ),
  ),
};

const actions = {
  signIn: async (payload: UserRequestPayload) => {
    state.setKey('status', RequestStatus.PENDING);

    try {
      state.set({
        data: User.create((await userApi.signIn(payload)).data),
        error: undefined,
        status: RequestStatus.SUCCESS,
      });
      // biome-ignore lint/suspicious/noExplicitAny: -
    } catch (err: any) {
      state.set({
        data: User.create(),
        error: err.status,
        status: RequestStatus.ERROR,
      });
    }
  },
  signOut: () => {
    state.set({
      data: User.create(),
      error: undefined,
      status: RequestStatus.SUCCESS,
    });
  },
  signUp: async (payload: UserRequestPayload) => {
    state.setKey('status', RequestStatus.PENDING);

    try {
      state.set({
        data: User.create((await userApi.signUp(payload)).data),
        error: undefined,
        status: RequestStatus.SUCCESS,
      });
      // biome-ignore lint/suspicious/noExplicitAny: -
    } catch (err: any) {
      state.set({
        data: User.create(),
        error: err.status,
        status: RequestStatus.ERROR,
      });
    }
  },
};

export const userStore = createStore(name, { actions, getters, state });

export const useUserStore = createReactStore({ actions, getters, state });
