import { ClassConstructor, plainToClass } from 'class-transformer';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import 'reflect-metadata';

export function excludeMiddleware<T extends object>(entity: T): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const originalSend = res.send;

    res.send = function (body: string): Response {
      const bodyToObj = JSON.parse(body);
      const excludeFieldsObj = plainToClass(
        entity as ClassConstructor<T>,
        bodyToObj,
        { excludeExtraneousValues: false },
      );

      return originalSend(excludeFieldsObj);
    };

    return next();
  };
}
