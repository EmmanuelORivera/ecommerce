import { NextFunction, Response, Request } from 'express';
import HttpStatusCode from '../exceptions/enum';
import HttpException from '../exceptions/HttpException';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new HttpException(
    HttpStatusCode.NOT_FOUND,
    `Not Found - ${req.originalUrl}`
  );
  next(error);
};

const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || HttpStatusCode.INTERNAL_SERVER_ERROR;
  res.status(status);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
