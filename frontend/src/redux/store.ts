import { configureStore } from '@reduxjs/toolkit';
import productList from './slices/productListSlice';
import productDetails from './slices/productDetailsSlice';
import cart from './slices/cartSlice';
import userLogin from './slices/userSlice';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems') as string)
  : [];
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo') as string)
  : null;
const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};
export const store = configureStore({
  preloadedState: initialState,
  reducer: { productList, productDetails, cart, userLogin },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
