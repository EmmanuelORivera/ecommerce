import { configureStore } from '@reduxjs/toolkit';
import cart from './slices/cartSlice';
import productDetails from './slices/productDetailsSlice';
import productList from './slices/productListSlice';
import userLogin from './slices/userSlice';

export const store = configureStore({
  reducer: { cart, productDetails, productList, userLogin },
});
