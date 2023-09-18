import { NextFunction, Request, Response } from 'express';
import { HttpException } from 'src/exception/HttpException';

export function errorMiddleware(
  err: HttpException,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({
    status,
    message,
  });
}
