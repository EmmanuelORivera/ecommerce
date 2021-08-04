import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getLocalStorageItem } from '../../Utils/browser';
import { addToCart } from '../thunks/cart';
import { IBaseState, ICartProduct, RootState } from '../types';
import StatusCode from '../enum';

interface IProductState extends IBaseState {
  cartItems: Array<ICartProduct>;
}

const initialState: IProductState = {
  cartItems: getLocalStorageItem<[]>('cartItems', []),
  status: StatusCode.IDLE,
  errorMessage: '',
};

const cartSlice = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    addItem: (state, action: PayloadAction<ICartProduct>) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        const arrayCartItems = state.cartItems.map((cartItem) =>
          cartItem.product === existItem.product ? item : cartItem
        );
        state.cartItems = arrayCartItems;
      } else {
        state.cartItems.push(item);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.product !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.status = StatusCode.IDLE;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.cartItems = action.payload;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.status = StatusCode.REJECTED;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    });
  },
});

export default cartSlice.reducer;
export const { addItem, removeItem } = cartSlice.actions;
export const cartSelector = (state: RootState) => state.cart;
