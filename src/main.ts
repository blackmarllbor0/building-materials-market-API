import { App } from './app/app';
import { OpenapiService } from './openapi/openapi.service';
import { ConfigService } from './config/config.service';
import { DatabaseService } from './database/database.service';
import { CreateUserDTO } from './user/DTO/createUser.DTO';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { LoggerService } from './logger/logger.service';
import { BaseController } from './app/base.controller';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { SessionService } from './session/session.service';
import { AuthAuditService } from './auth-audit/auth-audit.service';
import { UserRoleController } from './user-role/user-role.controller';
import { UserRoleService } from './user-role/user-role.service';

async function main(): Promise<void> {
  const configService = new ConfigService('.env');
  const PORT = configService.number('SERVER_PORT');

  const db = new DatabaseService(configService);
  await db.connect();

  const k = Object.keys(new CreateUserDTO());
  for (const name of k) {
    console.log(name);
  }

  const openapiService = new OpenapiService();
  const loggerService = new LoggerService();
  const sessionService = new SessionService(configService, db);
  const authAuditService = new AuthAuditService(db);
  const userService = new UserService(db);
  const authService = new AuthService(
    userService,
    sessionService,
    authAuditService,
  );
  const userRoleService = new UserRoleService(db);

  const userController = new UserController(userService);
  const authController = new AuthController(authService);
  const userRoleController = new UserRoleController(
    userRoleService,
    userService,
  );

  const controllers: BaseController[] = [
    userController,
    authController,
    userRoleController,
  ];

  const app = new App(controllers, PORT, openapiService, loggerService);

  await app.listen();
}

main();
