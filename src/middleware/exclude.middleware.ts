import { ClassConstructor, plainToClass } from 'class-transformer';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import 'reflect-metadata';

/**
 * Middleware for excluding specified fields from JSON responses.
 *
 * This middleware intercepts the response and removes specific fields from JSON responses
 * before sending them to the client. It uses the provided entity class to determine which
 * fields to exclude. This can be useful for hiding sensitive or unnecessary data in responses.
 *
 * @param {T} entity - The class representing the entity to be used for excluding fields.
 * @returns {RequestHandler} - Express middleware function for excluding fields from responses.
 *
 * @example
 * // Define an entity class for excluding fields.
 * import ( Exclude ) from 'class-transformer';
 * import ...
 *
 * Class User {
 *   id: number;
 *   email: string;
 *   @ Exclude()  passwordHash: string; // class-transformer decorator
 * }
 *
 * // Apply middleware to a specific route.
 * app.get('/user/:id', excludeMiddleware(User), (req, res) => {
 *   const user = getUserById(req.params.id);
 *   res.json(user); // The 'passwordHash' field will be excluded from the response.
 * });
 */
export function excludeMiddleware<T extends object>(entity: T): RequestHandler {
  return (_req: Request, res: Response, next: NextFunction) => {
    const oldSend = res.send;
    res.send = function (body: string): Response {
      const bodyToObj = JSON.parse(body);
      const excludeFieldsObj = plainToClass(
        entity as ClassConstructor<T>,
        bodyToObj,
        { excludeExtraneousValues: false },
      );

      res.send = oldSend;

      return res.send(excludeFieldsObj);
    };

    next();
  };
}
