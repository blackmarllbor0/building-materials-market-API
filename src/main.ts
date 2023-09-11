import * as process from 'process';
import { App } from './app/app';
import { OpenapiService } from './openapi/openapi.service';
import { UserRoleService } from './user-role/user-role.service';
import { UserRoleController } from './user-role/user-role.controller';

function main(): void {
  const PORT = +process.env.SERVER_PORT || 8080;

  const userRoleService = new UserRoleService();
  const openapiService = new OpenapiService();

  const userRoleController = new UserRoleController(userRoleService);

  const app = new App([userRoleController], PORT, openapiService);

  app.listen();
}

main();
