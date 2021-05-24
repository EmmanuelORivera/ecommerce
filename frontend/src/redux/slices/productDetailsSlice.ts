import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { IProduct } from '../../products';
import HTTP_STATUS from '../enum';
import { IBaseState, ValidationErrors } from './types';

interface IProductState extends IBaseState {
  product: IProduct;
}

export const fetchProductDetails = createAsyncThunk<
  IProduct,
  { id: string },
  { rejectValue: ValidationErrors }
>('product/fetchProduct', async ({ id }, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    return data;
  } catch (err) {
    let error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
  status: HTTP_STATUS.IDLE,
  product: {},
  errorMessage: '',
} as IProductState;

const productDetailsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductDetails.pending, (state) => {
      state.status = HTTP_STATUS.PENDING;
    });
    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.status = HTTP_STATUS.IDLE;
      state.product = action.payload;
    });
    builder.addCase(fetchProductDetails.rejected, (state, action) => {
      state.status = HTTP_STATUS.REJECTED;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    });
  },
});

export default productDetailsSlice.reducer;
