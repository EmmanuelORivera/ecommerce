import { configureStore } from '@reduxjs/toolkit';
import productList from './slices/productListSlice';
import product from './slices/productSlice';

export const store = configureStore({
  reducer: { productList, product },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
