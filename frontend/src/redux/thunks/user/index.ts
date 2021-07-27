import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { UserInfo, ValidationErrors } from '../../types';
import { USER_INFO } from '../../../constants/redux';

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
