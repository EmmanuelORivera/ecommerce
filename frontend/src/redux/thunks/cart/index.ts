import { AnyAction, createAsyncThunk, ThunkAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { CART_ITEMS, SHIPPING_ADDRESS } from '../../../constants/redux';
import { IProduct } from '../../../products';
import { removeItem, cartSaveShippingAddress } from '../../slices/cartSlice';
import {
  ICartProduct,
  IShippingAddress,
  RootState,
  ValidationErrors,
} from '../../types';

export const addToCart = createAsyncThunk<
  Array<ICartProduct>,
  { id: string; quantity: number },
  { rejectValue: ValidationErrors; state: RootState }
>(CART_ITEMS, async ({ id, quantity }, { rejectWithValue, getState }) => {
  try {
    const { data }: { data: IProduct } = await axios.get(`/api/products/${id}`);

    const cartProduct: ICartProduct = {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      quantity,
    };

    const state = getState().cart;

    const existFetchedOnState = state.cartItems.find(
      (cartItem) => cartItem.product === cartProduct.product
    );

    const getCartItems = () => {
      if (existFetchedOnState) {
        //make a copy and update only the ( CARTITEM ) that needs to be changed
        const { cartItems } = {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.product === existFetchedOnState.product
              ? cartProduct
              : cartItem
          ),
        };
        localStorage.setItem(CART_ITEMS, JSON.stringify(cartItems));
        return cartItems;
      } else {
        //just adding the new product to the array without a mutation
        const { cartItems } = {
          ...state,
          cartItems: [...state.cartItems, cartProduct],
        };
        localStorage.setItem(CART_ITEMS, JSON.stringify(cartItems));
        return cartItems;
      }
    };

    return getCartItems();
  } catch (err) {
    let error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

export const removeFromCart =
  (id: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch, getState) => {
    dispatch(removeItem(id));
    localStorage.setItem(CART_ITEMS, JSON.stringify(getState().cart.cartItems));
  };

export const saveShippingAddress =
  (data: IShippingAddress): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch) => {
    dispatch(cartSaveShippingAddress(data));
    localStorage.setItem(SHIPPING_ADDRESS, JSON.stringify(data));
  };
