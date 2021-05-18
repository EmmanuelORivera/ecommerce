import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import HTTP_STATUS from '../enum';
import { IProduct } from '../../products';
interface ProductsState {
  products: Array<IProduct>;
  loading: HTTP_STATUS;
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const { data } = await axios.get('/api/products');
    return data;
  }
);
export const productSlice = createSlice({
  name: 'products',
  initialState: { products: [], loading: HTTP_STATUS.IDLE } as ProductsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = HTTP_STATUS.PENDING;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = HTTP_STATUS.FULLFILED;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = HTTP_STATUS.REJECTED;
    });
  },
});

export default productSlice.reducer;
