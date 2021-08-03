import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../thunks/user';
import { getLocalStorageItem } from '../../Utils/browser';
import { USER, USER_INFO } from '../../constants/redux';

//Types enums
import StatusCode from '../enum';
import { IUserState, RootState } from '../types';

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

export const { logout } = userSlice.actions;
export default userSlice.reducer;
export const userLoginSelector = (state: RootState) => state.userLogin;
