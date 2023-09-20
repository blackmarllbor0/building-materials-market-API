import { Exclude } from 'class-transformer';

export class User {
  public id: number;
  public userRoleId: number;
  public userStatusId: number;
  public isBlocked: number;
  public isDeleted: number;

  public name: string;
  public email: string;
  public phoneNumber: string;
  @Exclude() public passwordHash: string;

  public createDate?: Date;
  public updateDate?: Date;
}
