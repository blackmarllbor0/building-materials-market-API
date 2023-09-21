import { NextFunction, Request, RequestHandler, Response } from 'express';
import { validate, ValidationError } from 'class-validator';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { HttpException } from '../exception/HttpException';

/**
 * Middleware for validating request data against a class-validator class.
 *
 * This middleware validates the request body against a specified class-validator class,
 * converting the request body into an instance of that class using class-transformer.
 * If validation fails, it sends a 400 Bad Request response with validation error details.
 *
 * @param {T} type - The class-validator class to use for validation.
 * @param {boolean} skipMissingProperties - (Optional) Skip validation for missing properties if set to true.
 * @returns {RequestHandler} - Express middleware function for request validation.
 *
 * @example
 * // Define a DTO (Data Transfer Object) class for request validation.
 * class CreateUserDto {
 *   @ IsString()
 *   @ MinLength(3)
 *   username: string;
 *
 *   @ IsEmail()
 *   email: string;
 * }
 *
 * // Apply middleware to a specific route.
 * app.post('/users', validateMiddleware(CreateUserDto), (req, res) => {
 *   // If request data doesn't match the CreateUserDto schema, a 400 Bad Request response will be sent.
 *   const user = createUser(req.body);
 *   res.json(user);
 * });
 */
export function validateMiddleware<T extends object>(
  type: T,
  skipMissingProperties: boolean = false,
): RequestHandler {
  return ({ body }: Request, _res: Response, next: NextFunction) => {
    validate(plainToInstance(type as ClassConstructor<T>, body), {
      skipMissingProperties,
    }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const msg = errors
          .map((err: ValidationError) => Object.values(err.constraints))
          .join(', ');
        next(new HttpException(400, msg));
      } else next();
    });
  };
}
