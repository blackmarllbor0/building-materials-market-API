export class Feedback {
  public id: number;
  public userId: number;
  public productId: number;
  public companyId: number;
  public rating: number;
  public title: string;
  public message: string;
  public isDeleted: number;
  public createDate: Date;
  public updateDate: Date;
}
