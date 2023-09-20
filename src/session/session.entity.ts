import { Exclude } from 'class-transformer';

export class Session {
  public id?: number;
  public userId: number;

  @Exclude() public token: string;

  public liveTime: Date;
  public createDate: Date;
  public updateDate: Date;
}
