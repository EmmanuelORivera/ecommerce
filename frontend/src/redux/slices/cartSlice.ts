import axios, { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBaseState, ValidationErrors } from './types';
import { RootState } from '../store';
import { IProduct } from '../../products';
import HTTP_STATUS from '../enum';

interface ICartProduct {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  quantity: number;
}

interface IProductState extends IBaseState {
  cartItems: Array<ICartProduct>;
}

export const addToCart = createAsyncThunk<
  Array<ICartProduct>,
  { id: string; quantity: number },
  { rejectValue: ValidationErrors; state: RootState }
>('cart/addToCart', async ({ id, quantity }, { rejectWithValue, getState }) => {
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

    const findFetchedItemOnCurrentState = state.cartItems.find(
      (cartItem) => cartItem.product === cartProduct.product
    );

    const returnCartItems = () => {
      if (findFetchedItemOnCurrentState) {
        //make a copy and update only the ( CARTITEM ) that needs to be changed
        const { cartItems } = {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.product === findFetchedItemOnCurrentState.product
              ? cartProduct
              : cartItem
          ),
        };
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        return cartItems;
      } else {
        //just adding the new product to the array without a mutation
        const { cartItems } = {
          ...state,
          cartItems: [...state.cartItems, cartProduct],
        };
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        return cartItems;
      }
    };

    return returnCartItems();
  } catch (err) {
    let error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

const initialState: IProductState = {
  cartItems: [],
  status: HTTP_STATUS.IDLE,
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
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.status = HTTP_STATUS.IDLE;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.cartItems = action.payload;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.status = HTTP_STATUS.REJECTED;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    });
  },
});

export default cartSlice.reducer;
export const { addItem } = cartSlice.actions;
export const cartSelector = (state: RootState) => state.cart;
