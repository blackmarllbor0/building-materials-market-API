import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exception/HttpException';

export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (err instanceof HttpException) {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).send({
      status,
      message,
    });
  }

  next();
}
