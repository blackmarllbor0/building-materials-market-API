import * as express from 'express';
import { Request, Response } from 'express';
import { IUserRole } from './user-role.interface';

export class UserRoleController {
  public path = 'user-role';
  public router = express.Router();

  constructor(private readonly userRoleService: IUserRole) {}

  private initRoutes(): void {
    this.router.post(this.path, this.create);
  }

  public create(req: Request, res: Response): void {
    const post = this.userRoleService.create(req.body.name);
    res.send(post);
  }
}
