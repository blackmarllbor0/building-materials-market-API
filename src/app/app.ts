import * as express from 'express';
import * as bodyParser from 'body-parser';
import { IOpenapi } from '../openapi/openapi.interface';

export class App {
  private app: express.Application;

  constructor(
    controllers: any[],
    private readonly port: number,
    private readonly openapiService: IOpenapi,
  ) {
    this.app = express();

    this.initMiddlewares();
    this.initControllers(controllers);
  }

  private initMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(express.json());
    // this.app.use(this.openapiService.getValidatorMiddleware());
    // this.app.use(this.openapiService.handlerValidateError);
    this.app.use('/api/docs', this.openapiService.getUIParseMiddleware());
  }

  private initControllers(controllers: any[]): void {
    if (controllers && controllers.length) {
      controllers.forEach((controller) => {
        this.app.use('/', controller.router);
      });
    } else console.log('there is no handler');
  }

  public async listen(): Promise<void> {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
