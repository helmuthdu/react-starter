import moize from 'moize';
import { User, UserSchema } from '../models/user';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { usersApi } from '../api';
import { AppState } from '../../../stores';

enum RequestErrorType {
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
  UserNotFound = 'USER_NOT_FOUND',
  UserInvalid = 'USER_INVALID'
}

export type State = {
  entity: UserSchema;
  loading: 'idle' | 'pending' | 'completed';
  error?: RequestErrorType;
};

export type UserPayload = { email: string; password: string };

export const name = 'user';

export const initialState: State = {
  entity: User.create(),
  loading: 'idle',
  error: undefined
};

export const actionSignUp = createAsyncThunk(`${name}/signUp`, async (payload: UserPayload, { rejectWithValue }) => {
  try {
    return User.create((await usersApi.signUp(payload)).data);
  } catch (err) {
    return rejectWithValue(RequestErrorType.UserAlreadyExists);
  }
});

export const actionSignIn = createAsyncThunk(`${name}/signIn`, async (payload: UserPayload, { rejectWithValue }) => {
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

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    actionSignOut: () => ({ entity: User.create(), loading: 'idle', error: undefined } as State)
  },
  extraReducers: builder => {
    builder
      .addCase(actionSignUp.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(actionSignUp.fulfilled, (state, action) => {
        state.loading = 'completed';
        state.entity = action.payload as UserSchema;
      })
      .addCase(actionSignUp.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload as RequestErrorType;
      })
      .addCase(actionSignIn.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(actionSignIn.fulfilled, (state, action) => {
        state.loading = 'completed';
        state.entity = action.payload as UserSchema;
      })
      .addCase(actionSignIn.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload as RequestErrorType;
      });
  }
});

export const selectorUserName = moize(
  (state: AppState) => {
    console.log('getUserName', state.user.entity.userName);
    return state.user.entity.userName;
  },
  { isDeepEqual: true }
);

export const selectorIsLoggedIn = moize((state: AppState) => !!state.user.entity.token, { isDeepEqual: true });

export const { actionSignOut } = slice.actions;

export const reducer = slice.reducer;
