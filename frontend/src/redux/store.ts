import { configureStore } from '@reduxjs/toolkit';
import productList from './slices/productListSlice';
import productDetails from './slices/productDetailsSlice';
import cart from './slices/cartSlice';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems') as string)
  : [];
const initialState = {
  cart: { cartItems: cartItemsFromStorage },
};
export const store = configureStore({
  preloadedState: initialState,
  reducer: { productList, productDetails, cart },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
