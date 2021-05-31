import StatusCode from '../enum';

export interface IBaseState {
  status: StatusCode;
  errorMessage: string | undefined;
}
export interface ValidationErrors {
  message: string;
  stack: string | null;
}

export interface ICartProduct {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  quantity: number;
}
