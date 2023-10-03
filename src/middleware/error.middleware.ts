import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { HttpException } from '../exception/HttpException';
import { ILoggerService } from '../logger/logger.service.interface';

export function errorMiddleware(
  loggerService: ILoggerService,
): ErrorRequestHandler {
  return (err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    if (err instanceof HttpException) {
      res.status(status).json({
        status,
        message,
      });
    } else {
      res.status(status).json({
        status,
        message,
      });
    }

    loggerService.error(err?.['message'] as string, err?.['status']);

    next();
  };
}
