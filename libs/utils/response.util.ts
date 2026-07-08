import { dayjs } from '@libs/utils/dayjs.util';
import { RequestUtil } from '@libs/utils/request.util';
import { Request, Response } from 'express';

export const responseInterceptor = async (
  data: any,
  request: Request,
  response: Response,
) => {
  const timestamp = dayjs().utc()
    .format();

  response.setHeader(
    'Cache-Control',
    `no-cache, max-age=${dayjs.duration(1, 'hour').asSeconds()}`,
  );
  response.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (data?.pagination) {
    response.setHeader('X-Page', data.pagination.page);
    response.setHeader('X-Limit', data.pagination.limit);
    response.setHeader('X-Total-Pages', data.pagination.totalPages);
    response.setHeader('X-Total-Results', data.pagination.totalResults);
  }

  return {
    data,
    metadata: {
      requestID: request.id,
      resource: RequestUtil.GetFormattedPath(request),
      statusCode: response.statusCode,
      timestamp,
    },
  };
};
