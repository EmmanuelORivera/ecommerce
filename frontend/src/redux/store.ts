import { configureStore } from '@reduxjs/toolkit';
import productList from './slices/productListSlice';
import productDetails from './slices/productDetailsSlice';
import cart from './slices/cartSlice';
import userLogin from './slices/userSlice';

export const store = configureStore({
  reducer: { productList, productDetails, cart, userLogin },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
