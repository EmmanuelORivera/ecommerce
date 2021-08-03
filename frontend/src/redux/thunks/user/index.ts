import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {
  AppDispatch,
  RootState,
  UserInfo,
  UserUpdated,
  ValidationErrors,
} from '../../types';
import { details } from '../../slices/userDetailsSlice';
import { login } from '../../slices/userSlice';
import { USER_DETAILS, USER_INFO, USER_UPDATE } from '../../../constants/redux';

export const detailsUser = createAsyncThunk<
  UserInfo,
  string,
  {
    dispatch: AppDispatch;
    rejectValue: ValidationErrors;
    state: RootState;
  }
>(USER_DETAILS, async (urlPath, { getState, rejectWithValue }) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.get<UserInfo>(`/api/users/${urlPath}`, config);

    return data;
  } catch (err) {
    let error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

export const registerUser = createAsyncThunk<
  UserInfo,
  { email: string; name: string; password: string },
  { rejectValue: ValidationErrors }
>(
  'user/registerUser',
  async ({ email, name, password }, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post<UserInfo>(
        '/api/users',
        { email, name, password },
        config
      );

      dispatch(loginUser({ email, password }));

      localStorage.setItem(USER_INFO, JSON.stringify(data));

      return data;
    } catch (err) {
      let error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk<
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

    const { data } = await axios.post<UserInfo>(
      '/api/users/login',
      { email, password },
      config
    );

    localStorage.setItem(USER_INFO, JSON.stringify(data));

    return data;
  } catch (err) {
    let error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

export const updateProfile = createAsyncThunk<
  UserInfo,
  UserUpdated,
  { rejectValue: ValidationErrors; state: RootState }
>(
  USER_UPDATE,
  async (updatedUserInfo, { dispatch, getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.put<UserInfo>(
        '/api/users/profile',
        updatedUserInfo,
        config
      );

      dispatch(details(data));
      dispatch(login(data));

      localStorage.setItem(USER_INFO, JSON.stringify(data));

      return data;
    } catch (err) {
      let error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
