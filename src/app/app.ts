import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { IOpenapi } from '../openapi/openapi.interface';
import { errorMiddleware } from '../middleware/error.middleware';
import { BaseController } from './base.controller';
import { ILoggerService } from '../logger/logger.service.interface';

export class App {
  private app: express.Application;
  private readonly apiPath: string;

  constructor(
    controllers: BaseController[],
    private readonly port: number,
    private readonly openapiService: IOpenapi,
    private readonly loggerService: ILoggerService,
  ) {
    this.app = express();
    this.apiPath = '/api/v1';

    this.initMiddlewares();
    this.initControllers(controllers);
    this.initErrorHandling();
  }

  private initMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(
      cors({
        credentials: true,
        origin: 'http://localhost:3000',
      }),
    );
    this.app.use('/api/docs', this.openapiService.getUIParseMiddleware());
  }

  private initErrorHandling(): void {
    this.app.use(errorMiddleware(this.loggerService));
  }

  private initControllers(controllers: BaseController[]): void {
    if (controllers && controllers.length) {
      controllers.forEach((controller) => {
        this.loggerService.info(
          `[ ${(<BaseController>controller).constructor.name} ] { ${
            this.apiPath
          }${controller.path} } - all methods are running;`,
        );

        this.app.use(this.apiPath, controller.router);
      });
    } else this.loggerService.warn('there is no handler');
  }

  public async listen(): Promise<void> {
    this.app.listen(this.port, () => {
      this.loggerService.info(
        `App listening on the port http://loclhost:${this.port}${this.apiPath}`,
      );
    });
  }
}
