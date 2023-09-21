import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exception/HttpException';

export function errorMiddleware(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({
    status,
    message,
  });

  next();
}
