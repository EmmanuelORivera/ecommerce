import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import StatusCode from '../enum';
import { IProduct } from '../../products';
import { IBaseState, ValidationErrors } from './types';

interface IProductsState extends IBaseState {
  products: Array<IProduct>;
}

export const fetchProducts = createAsyncThunk<
  Array<IProduct>,
  void,
  { rejectValue: ValidationErrors }
>('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/api/products');
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
  products: [],
  status: StatusCode.IDLE,
  errorMessage: '',
} as IProductsState;

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = StatusCode.PENDING;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = StatusCode.IDLE;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = StatusCode.REJECTED;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    });
  },
});

export default productSlice.reducer;
