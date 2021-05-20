import HTTP_STATUS from '../enum';

export interface IBaseState {
  status: HTTP_STATUS;
  errorMessage: string | undefined;
}
export interface ValidationErrors {
  message: string;
  stack: string;
}
