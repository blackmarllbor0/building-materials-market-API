import { Response, Router } from 'express';

export abstract class BaseController {
  public router: Router;

  constructor(public readonly path: string) {
    this.router = Router();
  }

  abstract initRoutes(): void;

  public json(res: Response, code: number, message: string): Response {
    return res.status(code).json({ message });
  }

  public ok<T>(res: Response, dto?: T): Response<T | void> {
    if (dto) {
      res.type('application/json');
      return res.status(200).json(dto);
    }

    return res.sendStatus(200);
  }

  public created<T>(res: Response, data?: T): Response<T> {
    return res.status(201).json(data);
  }
}
