import { configureStore } from '@reduxjs/toolkit';
import productList from './slices/productSlice';

export const store = configureStore({
  reducer: { productList },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
