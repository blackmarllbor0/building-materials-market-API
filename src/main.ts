import { App } from './app/app';
import { OpenapiService } from './openapi/openapi.service';
import { ConfigService } from './config/config.service';
import { DatabaseService } from './database/database.service';
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
import { UserStatusService } from './user-status/user-status.service';
import { UserStatusController } from './user-status/user-status.controller';
import { OrderStatusService } from './order-status/order-status.service';
import { OrderStatusController } from './order-status/order-status.controller';
import { CompanyService } from './company/company.service';
import { CompanyController } from './company/company.controller';
import { CategoryService } from './category/category.service';
import { CategoryController } from './category/category.controller';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { OrderPaymentTypeService } from './order-payment-type/orderPaymentType.service';
import { OrderPaymentTypeController } from './order-payment-type/orderPaymentType.controller';
import { AuthAuditEventController } from './auth-audit-event/auth-audit-event.controller';
import { AuthAuditEventService } from './auth-audit-event/auth-audit-event.service';

async function main(): Promise<void> {
  const configService = new ConfigService('.env');
  const PORT = configService.number('SERVER_PORT');

  const db = new DatabaseService(configService);
  await db.connect();

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
  const userStatusService = new UserStatusService(db);
  const orderStatusService = new OrderStatusService(db);
  const companyService = new CompanyService(db);
  const categoryService = new CategoryService(db);
  const productService = new ProductService(db);
  const orderPaymentTypeService = new OrderPaymentTypeService(db);
  const authAuditEventService = new AuthAuditEventService(db);

  const userController = new UserController(userService);
  const authController = new AuthController(authService);
  const userRoleController = new UserRoleController(
    userRoleService,
    userService,
  );
  const userStatusController = new UserStatusController(
    userStatusService,
    userService,
  );
  const orderStatusController = new OrderStatusController(
    orderStatusService,
    userService,
  );
  const companyController = new CompanyController(companyService, userService);
  const categoryController = new CategoryController(
    categoryService,
    userService,
  );
  const productController = new ProductController(productService, userService);
  const orderPaymentTypeController = new OrderPaymentTypeController(
    orderPaymentTypeService,
    userService,
  );
  const authAuditEventController = new AuthAuditEventController(
    authAuditEventService,
    userService,
  );

  const controllers: BaseController[] = [
    userController,
    authController,
    userRoleController,
    userStatusController,
    orderStatusController,
    companyController,
    categoryController,
    productController,
    orderPaymentTypeController,
    authAuditEventController,
  ];

  const app = new App(controllers, PORT, openapiService, loggerService);

  await app.listen();
}

main();
