import { NextFunction, Request, RequestHandler, Response } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { HttpException } from '../exception/HttpException';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function validateMiddleware<T>(
  type: any,
  skipMissingProperties = false,
): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    validate(plainToClass(type, req.body), { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const msg = errors
            .map((err: ValidationError) => Object.values(err.constraints))
            .join(', ');
          next(new HttpException(400, msg));
        } else next();
      },
    );
  };
}
