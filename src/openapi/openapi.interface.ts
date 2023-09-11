import { OpenApiRequestHandler } from 'express-openapi-validator/dist/framework/types';
import { Request, Response } from 'express';

export interface IOpenapi {
  getValidatorMiddleware(): OpenApiRequestHandler[];

  getUIParseMiddleware(): any[];

  handlerValidateError(err, req: Request, res: Response): void;
}
