import { HttpStatus } from '@libs/enums/http-status.enum';
import { ErrorField } from '@libs/interfaces/errors';

export abstract class BaseException {
  code: string;

  statusCode: HttpStatus;

  message: string;

  errors?: ErrorField[];

  details: string;
}
