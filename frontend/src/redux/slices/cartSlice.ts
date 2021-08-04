import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getLocalStorageItem } from '../../Utils/browser';
import { addToCart } from '../thunks/cart';
import {
  ICartProduct,
  IProductState,
  IShippingAddress,
  RootState,
} from '../types';
import StatusCode from '../enum';
import { CART, CART_ITEMS, SHIPPING_ADDRESS } from '../../constants/redux';

const initialState: IProductState = {
  status: StatusCode.IDLE,
  errorMessage: '',
  cartItems: getLocalStorageItem(CART_ITEMS, []) as ICartProduct[],
  shippingAddress: getLocalStorageItem(
    SHIPPING_ADDRESS,
    {}
  ) as IShippingAddress,
};

const cartSlice = createSlice({
  initialState,
  name: CART,
  reducers: {
    // addItem: (state, action: PayloadAction<ICartProduct>) => {
    //   const item = action.payload;
    //   const existItem = state.cartItems.find((x) => x.product === item.product);

    //   if (existItem) {
    //     const arrayCartItems = state.cartItems.map((cartItem) =>
    //       cartItem.product === existItem.product ? item : cartItem
    //     );
    //     state.cartItems = arrayCartItems;
    //   } else {
    //     state.cartItems.push(item);
    //   }
    // },
    cartSaveShippingAddress: (
      state,
      action: PayloadAction<IShippingAddress>
    ) => {
      state.shippingAddress = action.payload;
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
export const { cartSaveShippingAddress, removeItem } = cartSlice.actions;
export const cartSelector = (state: RootState) => state.cart;
