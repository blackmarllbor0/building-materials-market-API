export class HttpException extends Error {
  message: string;
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.message = message;
    this.status = status;
  }
}
