import { App } from './app/app';
import { OpenapiService } from './openapi/openapi.service';
import { UserRoleService } from './user-role/user-role.service';
import { UserRoleController } from './user-role/user-role.controller';
import { ConfigService } from './config/config.service';

function main(): void {
  const configService = new ConfigService('.env');
  const PORT = configService.number('SERVER_PORT');

  const userRoleService = new UserRoleService();
  const openapiService = new OpenapiService();

  const userRoleController = new UserRoleController(userRoleService);

  const app = new App([userRoleController], PORT, openapiService);

  app.listen();
}

main();
