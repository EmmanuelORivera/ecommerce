import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import StatusCode from '../enum';
import axios, { AxiosError } from 'axios';
import { IBaseState, ValidationErrors } from './types';
import { RootState } from '../store';
import { getLocalStorageItem } from '../../Utils/browser';

type UserInfo = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
};
interface IUserState extends IBaseState {
  userInfo: UserInfo | null;
}
export const fetchUser = createAsyncThunk<
  UserInfo,
  { email: string; password: string },
  { rejectValue: ValidationErrors }
>('user/fetchUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    localStorage.setItem('userInfo', JSON.stringify(data));

    return data;
  } catch (err) {
    let error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

const initialState: IUserState = {
  status: StatusCode.IDLE,
  errorMessage: '',
  userInfo: getLocalStorageItem('userInfo', null),
};
const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    logout(state) {
      localStorage.removeItem('userInfo');
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = StatusCode.PENDING;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = StatusCode.IDLE;
      state.userInfo = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = StatusCode.REJECTED;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
export const userLoginSelector = (state: RootState) => state.userLogin;
