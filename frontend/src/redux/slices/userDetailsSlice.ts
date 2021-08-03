import { createSlice } from '@reduxjs/toolkit';
import { detailsUser } from '../thunks/user/index';
import { getLocalStorageItem } from '../../Utils/browser';
import { USER, USER_DETAILS } from '../../constants/redux';

import StatusCode from '../enum';
import { IUserDetailsState, RootState, UserInfo } from '../types';

const initialState: IUserDetailsState = {
  status: StatusCode.IDLE,
  errorMessage: '',
  user: getLocalStorageItem(USER_DETAILS, null) as UserInfo,
  orders: {},
};

const userDetailsSlice = createSlice({
  initialState,
  name: USER_DETAILS,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(detailsUser.pending, (state) => {
      state.status = StatusCode.PENDING;
    });
    builder.addCase(detailsUser.fulfilled, (state, action) => {
      state.status = StatusCode.IDLE;
      state.errorMessage = '';
      state.user = action.payload;
    });
    builder.addCase(detailsUser.rejected, (state, action) => {
      state.status = StatusCode.REJECTED;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    });
  },
});

export default userDetailsSlice.reducer;
export const userDetailsSelector = (state: RootState) => state.userDetails;
