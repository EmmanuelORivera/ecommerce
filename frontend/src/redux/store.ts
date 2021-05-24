import { configureStore } from '@reduxjs/toolkit';
import productList from './slices/productListSlice';
import productDetails from './slices/productDetailsSlice';

export const store = configureStore({
  reducer: { productList, productDetails },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
