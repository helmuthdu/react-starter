import { createAsyncThunk, createSelector, createSlice, Draft } from '@reduxjs/toolkit';
import { AppState } from '../../../stores';
import { usersApi } from '../api';
import { User, UserSchema } from '../entities/user';

enum RequestErrorType {
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
  UserNotFound = 'USER_NOT_FOUND',
  UserInvalid = 'USER_INVALID'
}

export type State = {
  entity?: UserSchema;
  status: 'idle' | 'pending' | 'completed';
  error?: RequestErrorType;
};

export type UserPayload = { email: string; password: string };

export const STORE_ID = 'user' as const;

export const initialState: State = {
  entity: undefined,
  status: 'idle',
  error: undefined
};

export const signUpAction = createAsyncThunk(
  `${STORE_ID}/signUp`,
  async (payload: UserPayload, { rejectWithValue }) => {
    try {
      return User.create((await usersApi.signUp(payload)).data);
    } catch (err) {
      return rejectWithValue(RequestErrorType.UserAlreadyExists);
    }
  }
);

export const signInAction = createAsyncThunk(
  `${STORE_ID}/signIn`,
  async (payload: UserPayload, { rejectWithValue }) => {
    try {
      return User.create((await usersApi.signIn(payload)).data);
    } catch (err: any) {
      if (err.status === 409) {
        return rejectWithValue(RequestErrorType.UserNotFound);
      } else {
        return rejectWithValue(RequestErrorType.UserInvalid);
      }
    }
  }
);

export const store = createSlice({
  name: STORE_ID,
  initialState,
  reducers: {
    signOutAction: () => ({ entity: User.create(), status: 'idle', error: undefined }) as State
  },
  extraReducers: builder => {
    builder
      .addCase(signUpAction.pending, (state: Draft<State>) => {
        state.status = 'pending';
      })
      .addCase(signUpAction.fulfilled, (state: Draft<State>, action) => {
        state.status = 'completed';
        state.entity = action.payload as UserSchema;
        state.error = undefined;
      })
      .addCase(signUpAction.rejected, (state: Draft<State>, action) => {
        state.status = 'idle';
        state.entity = undefined;
        state.error = action.payload as RequestErrorType;
      })
      .addCase(signInAction.pending, (state: Draft<State>) => {
        state.status = 'pending';
      })
      .addCase(signInAction.fulfilled, (state: Draft<State>, action) => {
        state.status = 'completed';
        state.entity = action.payload as UserSchema;
        state.error = undefined;
      })
      .addCase(signInAction.rejected, (state: Draft<State>, action) => {
        state.status = 'idle';
        state.entity = undefined;
        state.error = action.payload as RequestErrorType;
      });
  }
});

export const reducer = store.reducer;

export const userNameSelector = createSelector(
  (state: AppState) => state,
  (state: AppState) => {
    console.log('getUserName', state.user.entity?.userName);

    return state.user.entity?.userName ?? '';
  }
);

export const isLoggedInSelector = createSelector(
  (state: AppState) => state,
  (state: AppState) => !!state.user.entity?.token
);

export const { signOutAction } = store.actions;
