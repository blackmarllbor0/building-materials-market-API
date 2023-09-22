import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { HttpException } from '../exception/HttpException';
import { ILoggerService } from 'src/logger/logger.service.interface';

export function errorMiddleware(
  loggerService: ILoggerService,
): ErrorRequestHandler {
  return (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpException) {
      const status = err.status || 500;
      const message = err.message || 'Internal Server Error';
      res.status(status).send({
        status,
        message,
      });
    }

    loggerService.error(err?.['message'] as string, err?.['code']);

    next();
  };
}
