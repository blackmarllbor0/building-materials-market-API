export class Order {
  public id: number;
  public userId: number;
  public orderStatusId: number;
  public orderPaymentTypeId: number;
  public isCanceled: number;
  public number: number;
  public totalCost: number;
  public totalQuantity: number;
  public createDate: Date;
  public updateDate: Date;
}
