import { NextFunction, RequestHandler, Response } from 'express';
import { RequestWithUser } from '../user/requestWithUser';
import * as jwt from 'jsonwebtoken';
import { AuthenticationTokenMissingException } from '../session/exceptions/AuthenticationTokenMissing.exception';
import { TokenIsNotValid } from '../session/exceptions/TokenIsNotValid.exception';
import { IUserService } from '../user/user.service.interface';
import { UserRoleEnum } from '../user-role/userRole.enun';
import { UserIdNotAdmin } from '../user-role/exceptions/userIsNotAdmin.exception';
import { UserDoesNotExists } from '../user/exception/userDoesNotExist.exception';

/**
 * Authentication middleware for protecting routes based on user role.
 *
 * This middleware checks if the user has a valid authentication token and whether their role
 * matches the specified role required to access the protected route. If authentication fails
 * or the user's role doesn't match, it sends an appropriate error response.
 *
 * @param {IUserService} userService - An instance of the user service.
 * @param {UserRoleEnum} role - The required user role to access the protected route.
 * @returns {RequestHandler} - Express middleware function for authentication and role authorization.
 *
 * @example
 * // Apply middleware to an admin-only route.
 * app.get('/admin/dashboard', authMiddleware(
 *   userService,
 *   UserRoleEnum.admin,
 * ), (req, res) => {
 *   // Only users with the 'ADMIN' role can access this route.
 *   res.render('admin-dashboard');
 * });
 */
export function authMiddleware(
  userService: IUserService,
  role: UserRoleEnum = UserRoleEnum.customer,
): RequestHandler {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const cookies = req.cookies;
    if (!cookies['Authorization']) {
      next(new AuthenticationTokenMissingException());
    }

    try {
      const payload = jwt.verify(
        cookies['Authorization'],
        process.env.TOKEN_SECRET,
      ) as { userId: number };

      const user = await userService.getById(payload.userId);
      if (!user) {
        next(new UserDoesNotExists());
      }

      if (user.userRoleId !== role && role === UserRoleEnum.admin) {
        next(new UserIdNotAdmin());
      }

      req.user = user;
    } catch (error) {
      next(new TokenIsNotValid());
    }

    next();
  };
}
