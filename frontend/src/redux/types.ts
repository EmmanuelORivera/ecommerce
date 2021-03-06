import StatusCode from './enum';
import { store } from './store';

export interface IBaseState {
  status: StatusCode;
  errorMessage: string | undefined;
}

export interface ICartProduct {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  quantity: number;
}

export interface IProductState extends IBaseState {
  cartItems: Array<ICartProduct>;
  shippingAddress: IShippingAddress;
}

export interface IShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IUserState extends IBaseState {
  userInfo: UserInfo | null;
}

export interface IUserDetailsState extends IBaseState {
  user: Omit<UserInfo, 'token'>;
  orders: {};
}

export type UserInfo = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
};

export type UserUpdated = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export interface ValidationErrors {
  message: string;
  stack: string | null;
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
