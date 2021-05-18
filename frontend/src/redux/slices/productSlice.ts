import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IProduct } from '../../products';
import HTTP_STATUS from '../enum';

interface ProductState {
  loading: HTTP_STATUS;
  product: IProduct;
}

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (urlID: string) => {
    const { data } = await axios.get(`/api/products/${urlID}`);
    return data;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    loading: HTTP_STATUS.IDLE,
    product: {},
  } as ProductState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = HTTP_STATUS.PENDING;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = HTTP_STATUS.FULLFILED;
      state.product = action.payload;
    });
    builder.addCase(fetchProduct.rejected, (state) => {
      state.loading = HTTP_STATUS.REJECTED;
    });
  },
});

export default productSlice.reducer;
