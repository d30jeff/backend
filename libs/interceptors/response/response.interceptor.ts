import { Metadata } from '@libs/interceptors/response/metadata';
import { ExpressRequest, ExpressResponse } from '@libs/interfaces/express.interface';
import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import etag from 'etag';
import { map, Observable } from 'rxjs';

export interface Response {
  data: object;
  metadata: Metadata;
}

export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseInterceptor.name);
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ExpressResponse | Response> | Promise<Observable<ExpressResponse | Response>> {
    const request = context.switchToHttp().getRequest<ExpressRequest>();
    const response = context.switchToHttp().getResponse<ExpressResponse>();
    return next.handle().pipe(map((data) => {
      if (request.method === 'GET' && data) {
        const generatedEtag = etag(JSON.stringify(data), { weak: true });
        this.logger.log(data, generatedEtag);

        const ifNoneMatch = request.headers['if-none-match'];
        response.setHeader('ETag', generatedEtag);

        if (ifNoneMatch && ifNoneMatch === generatedEtag) {
          response.status(HttpStatus.NOT_MODIFIED);
        }
      }

      return {
        data,
        metadata: new Metadata(context),
      };
    }));
  }

}
