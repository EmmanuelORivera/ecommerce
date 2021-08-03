import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../thunks/user';
import { getLocalStorageItem } from '../../Utils/browser';
import { USER, USER_INFO } from '../../constants/redux';

//Types enums
import StatusCode from '../enum';
import { IUserState, RootState, UserInfo } from '../types';

const initialState: IUserState = {
  status: StatusCode.IDLE,
  errorMessage: '',
  userInfo: getLocalStorageItem(USER_INFO, null),
};
const userSlice = createSlice({
  initialState,
  name: USER,
  reducers: {
    logout(state) {
      localStorage.removeItem(USER_INFO);
      state.userInfo = null;
    },
    login(state, action: PayloadAction<UserInfo, string>) {
      state.status = StatusCode.IDLE;
      state.errorMessage = '';
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = StatusCode.PENDING;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = StatusCode.IDLE;
      state.errorMessage = '';
      state.userInfo = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = StatusCode.REJECTED;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    });

    builder.addCase(registerUser.pending, (state) => {
      state.status = StatusCode.PENDING;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = StatusCode.IDLE;
      state.errorMessage = '';
      state.userInfo = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = StatusCode.REJECTED;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    });
  },
});

export const { logout, login } = userSlice.actions;
export default userSlice.reducer;
export const userLoginSelector = (state: RootState) => state.userLogin;
