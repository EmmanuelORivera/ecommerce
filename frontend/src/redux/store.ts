import { configureStore } from '@reduxjs/toolkit';
import cart from './slices/cartSlice';
import productDetails from './slices/productDetailsSlice';
import productList from './slices/productListSlice';
import userDetails from './slices/userDetailsSlice';
import userLogin from './slices/userSlice';
import userUpdateProfile from './slices/userUpdateSlice';

export const store = configureStore({
  reducer: {
    cart,
    productDetails,
    productList,
    userDetails,
    userLogin,
    userUpdateProfile,
  },
});
