import { IUserDocument } from '../../models/user/types';

declare global {
  namespace Express {
    interface Request {
      user: IUserDocument;
    }
  }
}
