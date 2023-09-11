import { IOpenapi } from './openapi.interface';
import { OpenApiRequestHandler } from 'express-openapi-validator/dist/framework/types';
import * as OpenApiValidator from 'express-openapi-validator';
import * as path from 'path';
import * as swaggerUi from 'swagger-ui-express';
import * as yaml from 'yamljs';
import { Request, Response } from 'express';

export class OpenapiService implements IOpenapi {
  private readonly openapiPath: string;

  constructor() {
    this.openapiPath = path.join(__dirname, 'openapi.yaml');
  }

  public getValidatorMiddleware(): OpenApiRequestHandler[] {
    return OpenApiValidator.middleware({
      apiSpec: this.openapiPath,
      validateRequests: true,
      validateResponses: true,
    });
  }

  public getUIParseMiddleware(): any[] {
    const openApiSpec = yaml.load(this.openapiPath);
    return [swaggerUi.serve, swaggerUi.setup(openApiSpec)];
  }

  public handlerValidateError(err: any, req: Request, res: Response): void {
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
    });
  }
}
