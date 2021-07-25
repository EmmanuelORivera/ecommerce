import axios, { AxiosError } from 'axios';
import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  ThunkAction,
} from '@reduxjs/toolkit';
import { IBaseState, ValidationErrors, ICartProduct } from './types';
import { RootState } from '../store';
import { IProduct } from '../../products';
import StatusCode from '../enum';
import { getLocalStorageItem } from '../../Utils/browser';

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
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  };

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
