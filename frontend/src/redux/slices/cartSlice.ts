import axios, { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ValidationErrors } from './types';
import { RootState } from '../store';
import { IProduct } from '../../products';

interface ICartProduct {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  quantity: number;
}

interface IPayload {
  product: ICartProduct;
}

interface IProductState {
  cartItems: Array<IPayload>;
}

const addToCart = createAsyncThunk<
  IPayload,
  { id: string; quantity: number },
  { rejectValue: ValidationErrors; state: RootState }
>('cart/addToCart', async ({ id, quantity }, { rejectWithValue, getState }) => {
  try {
    const { data }: { data: IProduct } = await axios.get(`/api/products/${id}`);
    const cartProduct: IPayload = {
      product: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        quantity,
      },
    };

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
    return cartProduct;
  } catch (err) {
    let error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

const initialState: IProductState = { cartItems: [] };

const cartSlice = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    addItem: (state, action: PayloadAction<IPayload>) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        const test = state.cartItems.map((x) =>
          x.product === existItem.product ? item : x
        );
        state.cartItems = test;
      } else {
        state.cartItems.push(item);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.cartItems.push(action.payload);
    });
  },
});

export default cartSlice.reducer;
export const { addItem } = cartSlice.actions;
export const cartSelector = (state: RootState) => state.cart;
