import { ExpressRequest } from '@libs/interfaces/express.interface';
import { dayjs } from '@libs/utils/dayjs.util';
import { Dayjs } from 'dayjs';

export class RequestUtil {
  static GetFormattedPath(request: ExpressRequest): string {
    return [request.baseUrl, request.path]
      .filter((path) => {
        return Boolean(path);
      })
      .join('');
  }

  static GetDateFromLastModifiedHeader(request: ExpressRequest): Dayjs | null {
    const ifModifiedSince = request.headers['if-modified-since'];

    if (!ifModifiedSince) {
      return null;
    }

    const modifiedDate = dayjs(ifModifiedSince);

    if (modifiedDate.isValid() === false) {
      return null;
    }

    return modifiedDate;
  }
}
