import moize from 'moize';
import { User } from '../models/user';
import { createAsyncThunk, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { usersApi } from '../api';
import { AppState } from '../../../stores';

export type State = Readonly<typeof initialState>;
export type UserPayload = State;

export const name = 'user';

export const initialState = User.create();

export const actionSignUp = createAsyncThunk(`${name}/signUp`, async (payload: UserPayload) =>
  User.create((await usersApi.signUp(payload)).data)
);

export const actionSignIn = createAsyncThunk(`${name}/signIn`, async (payload: UserPayload) =>
  User.create((await usersApi.signIn(payload)).data)
);

export const actionSignOut = createAsyncThunk(`${name}/signOut`, () => User.create());

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    actionSetUser: (state: Draft<State>, action: PayloadAction<UserPayload>) =>
      User.create({ ...state, ...action.payload })
  },
  extraReducers: builder => {
    builder
      .addCase(actionSignIn.fulfilled, (state, action) => action.payload)
      .addCase(actionSignUp.fulfilled, (state, action) => action.payload)
      .addCase(actionSignOut.fulfilled, (state, action) => action.payload);
  }
});

export const selectorUserName = moize(
  (state: AppState) => {
    console.log('getUserName', state.user.userName);
    return state.user.userName;
  },
  { isDeepEqual: true }
);

export const selectorIsLoggedIn = moize((state: AppState) => !!state.user.token, { isDeepEqual: true });

export const { actionSetUser } = slice.actions;

export const reducer = slice.reducer;

export type Reducer = typeof reducer;
