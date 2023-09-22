import { Lob } from 'oracledb';

export class Company {
  public id: number;
  public name: string;
  public linkToWebsite: string;
  public phoneNumber: string;
  public linkToLogoImage: string;
  public email: string;
  public description: string | Lob;
  public isDeleted: number;
  public createDate: Date;
  public updateDate: Date;
}
