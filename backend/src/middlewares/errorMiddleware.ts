import { NextFunction, Response, Request } from 'express';
import HttpException from '../exceptions/HttpException';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const NOT_FOUND = 404;
  const error = new HttpException(NOT_FOUND, `Not Found - ${req.originalUrl}`);
  next(error);
};

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(status);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
