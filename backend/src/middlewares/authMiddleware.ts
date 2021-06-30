import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import HttpStatusCode from '../exceptions/enum';
import HttpException from '../exceptions/HttpException';
import User from '../models/user/model';
import { IUserDocument } from '../models/user/types';

interface IDecoded {
  id: string;
  iat: number;
  exp: number;
}
const getToken = (authorization: string) => authorization.split(' ')[1];

const protect = asyncHandler(async (req, res, next) => {
  let token;
  const authorization = req.headers.authorization;
  if (authorization && authorization.startsWith('Bearer')) {
    if (process.env.JWT_SECRET) {
      token = getToken(authorization);
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as IDecoded;

        req.user = (await User.findById(decoded.id).select(
          '-password'
        )) as IUserDocument;

        next();
      } catch (err) {
        throw new HttpException(
          HttpStatusCode.UNAUTHORIZED,
          'Not authorized, token failed'
        );
      }
    } else {
      throw new Error('env variable JWT_SECRET not found');
    }
  }
  if (!token) {
    const error = new HttpException(
      HttpStatusCode.UNAUTHORIZED,
      'Not authorized, no token'
    );
    next(error);
  }
});
export { protect };
