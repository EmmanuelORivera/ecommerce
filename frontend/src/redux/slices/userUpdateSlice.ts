import { createSlice } from '@reduxjs/toolkit';
import { updateProfile } from '../thunks/user';
import { USER_UPDATE } from '../../constants/redux';

//Types enums
import StatusCode from '../enum';
import { IUserState, RootState } from '../types';

const initialState: IUserState = {
  status: StatusCode.IDLE,
  errorMessage: '',
  userInfo: null,
};
const userUpdateSlice = createSlice({
  initialState,
  name: USER_UPDATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateProfile.pending, (state) => {
      state.status = StatusCode.PENDING;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.status = StatusCode.IDLE;
      state.errorMessage = '';
      state.userInfo = action.payload;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.status = StatusCode.REJECTED;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    });
  },
});

export default userUpdateSlice.reducer;
export const userUpdateSelector = (state: RootState) => state.userUpdateProfile;
