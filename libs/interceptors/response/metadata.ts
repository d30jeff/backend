import { dayjs } from '@libs/utils/dayjs.util';
import { RequestUtil } from '@libs/utils/request.util';
import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

export class Metadata {
  requestID: string;

  resource: string;

  statusCode: HttpStatus;

  timestamp: string;
  constructor(params: ArgumentsHost) {
    const ctx = params.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    this.requestID = request.id;
    this.resource = RequestUtil.GetFormattedPath(request);
    this.statusCode = response.statusCode;
    this.timestamp = dayjs().utc()
      .format();
  }
}
