import { HttpStatus } from '@libs/enums/http-status.enum';
import { BaseException } from '@libs/exceptions/base.exception';
import { ErrorField } from '@libs/interfaces/errors';
import { StringUtil } from '@libs/utils/string.util';

export namespace HttpException {
  type Params = {
    status: HttpStatus;
    message: string;
    details: string;
    errors?: ErrorField[];
    code: string;
  };

  export class Instance extends BaseException {
    constructor(props: Params) {
      super();
      const {
        status,
        message,
        errors,
        details,
        code,
      } = props;

      this.statusCode = status;
      this.message = message;
      this.errors = errors;
      this.details = details;
      this.code = code || StringUtil.ConstantCase(message);
    }
  }
}
