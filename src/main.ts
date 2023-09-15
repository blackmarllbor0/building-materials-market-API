import { App } from './app/app';
import { OpenapiService } from './openapi/openapi.service';
import { UserRoleService } from './user-role/user-role.service';
import { UserRoleController } from './user-role/user-role.controller';
import { ConfigService } from './config/config.service';
import { DatabaseService } from './database/database.service';
import { CreateUserDTO } from './user/DTO/createUser.DTO';

async function main(): Promise<void> {
  const configService = new ConfigService('.env');
  const PORT = configService.number('SERVER_PORT');

  const db = new DatabaseService(configService);
  const connection = await db.connect();

  // const dto = new CreateUserDTO();
  // const f = getObjectFields(dto);
  // console.log(f);

  const k = Object.keys(new CreateUserDTO());
  for (const name of k) {
    console.log(name);
  }

  const userRoleService = new UserRoleService();
  const openapiService = new OpenapiService();

  const userRoleController = new UserRoleController(userRoleService);

  const app = new App([userRoleController], PORT, openapiService);

  await app.listen();
  await connection.close();
}

main();
