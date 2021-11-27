import moize from 'moize';
import { User, UserSchema } from '../models/user';
import { createAsyncThunk, createSlice, Draft } from '@reduxjs/toolkit';
import { usersApi } from '../api';
import { AppState } from '../../../stores';

enum RequestErrorType {
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
  UserNotFound = 'USER_NOT_FOUND',
  UserInvalid = 'USER_INVALID'
}

export type State = {
  data?: UserSchema;
  status: 'idle' | 'pending' | 'completed';
  error?: RequestErrorType;
};

export type UserPayload = { email: string; password: string };

export const name = 'user';

export const initialState: State = {
  data: undefined,
  status: 'idle',
  error: undefined
};

export const signUpAction = createAsyncThunk(`${name}/signUp`, async (payload: UserPayload, { rejectWithValue }) => {
  try {
    return User.create((await usersApi.signUp(payload)).data);
  } catch (err) {
    return rejectWithValue(RequestErrorType.UserAlreadyExists);
  }
});

export const signInAction = createAsyncThunk(`${name}/signIn`, async (payload: UserPayload, { rejectWithValue }) => {
  try {
    return User.create((await usersApi.signIn(payload)).data);
  } catch (err: any) {
    if (err.status === 409) {
      return rejectWithValue(RequestErrorType.UserNotFound);
    } else {
      return rejectWithValue(RequestErrorType.UserInvalid);
    }
  }
});

export const store = createSlice({
  name,
  initialState,
  reducers: {
    signOutAction: () => ({ data: User.create(), status: 'idle', error: undefined } as State)
  },
  extraReducers: builder => {
    builder
      .addCase(signUpAction.pending, (state: Draft<State>, action) => {
        state.status = 'pending';
      })
      .addCase(signUpAction.fulfilled, (state: Draft<State>, action) => {
        state.status = 'completed';
        state.data = action.payload as UserSchema;
        state.error = undefined;
      })
      .addCase(signUpAction.rejected, (state: Draft<State>, action) => {
        state.status = 'idle';
        state.data = undefined;
        state.error = action.payload as RequestErrorType;
      })
      .addCase(signInAction.pending, (state: Draft<State>, action) => {
        state.status = 'pending';
      })
      .addCase(signInAction.fulfilled, (state: Draft<State>, action) => {
        state.status = 'completed';
        state.data = action.payload as UserSchema;
        state.error = undefined;
      })
      .addCase(signInAction.rejected, (state: Draft<State>, action) => {
        state.status = 'idle';
        state.data = undefined;
        state.error = action.payload as RequestErrorType;
      });
  }
});

export const userNameSelector = moize(
  (state: AppState) => {
    console.log('getUserName', state.user.data?.userName);
    return state.user.data?.userName;
  },
  { isDeepEqual: true }
);

export const isLoggedInSelector = moize((state: AppState) => !!state.user.data?.token, { isDeepEqual: true });

export const { signOutAction } = store.actions;

export const reducer = store.reducer;
