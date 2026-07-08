import { randomUUID } from 'node:crypto';

import {
  ExpressNextFunction,
  ExpressRequest,
  ExpressResponse,
} from '@libs/interfaces/express.interface';

const ATTRIBUTE_NAME = 'id';

export function requestID({
  headerName = 'X-Request-Id', setHeader = true,
} = {}) {
  return function (
    request: ExpressRequest,
    response: ExpressResponse,
    next: ExpressNextFunction,
  ) {
    const oldValue = request.get(headerName);
    const id = oldValue === undefined ? randomUUID() : oldValue;

    if (setHeader) {
      response.set(headerName, id);
    }

    request[ATTRIBUTE_NAME] = id;

    next();
  };
}
