import { HttpStatus } from '@libs/enums/http-status.enum';
import { HttpException } from '@libs/exceptions/http-exception.interface';
import { ErrorField } from '@libs/interfaces/errors';

export class BadRequestException extends HttpException.Instance {
  constructor(message: string = 'Bad Request', errors?: ErrorField[], details = 'It seems like there is a few data missing, please check your payload', code = '') {
    super({
      code,
      details,
      errors,
      message,
      status: HttpStatus.BadRequest,
    });
  }
}

export class UnauthorizedException extends HttpException.Instance {
  constructor(message: string = 'Unauthorized', details = '', code = '') {
    super({
      code,
      details,
      message,
      status: HttpStatus.Unauthorized,
    });
  }
}
export class ForbiddenException extends HttpException.Instance {
  constructor(message: string, details = '', code = '') {
    super({
      code,
      details,
      message,
      status: HttpStatus.Forbidden,
    });
  }
}

export class NotFoundException extends HttpException.Instance {
  constructor(message: string, details = '', code = '') {
    super({
      code,
      details,
      message,
      status: HttpStatus.NotFound,
    });
  }
}

export class MethodNotAllowedException extends HttpException.Instance {
  constructor(message: string, details = '', code = '') {
    super({
      code,
      details,
      message,
      status: HttpStatus.MethodNotAllowed,
    });
  }
}

export class ConflictException extends HttpException.Instance {
  constructor(message: string, details?: string, code = '') {
    super({
      code,
      details: details!,
      message,
      status: HttpStatus.Conflict,
    });
  }
}

export class PaymentRequiredException extends HttpException.Instance {
  constructor(message: string, details = '', code = '') {
    super({
      code,
      details,
      message,
      status: HttpStatus.PaymentRequired,
    });
  }
}

export class UnprocessableEntityException extends HttpException.Instance {
  constructor(message: string, details = '', code = '') {
    super({
      code,
      details,
      message,
      status: HttpStatus.UnprocessableEntity,
    });
  }
}

export class TooManyRequestsException extends HttpException.Instance {
  constructor(message: string, details = '', code = '') {
    super({
      code,
      details,
      message,
      status: HttpStatus.TooManyRequests,
    });
  }
}

export class InternalServerErrorException extends HttpException.Instance {
  constructor(message: string = 'Something went wrong', details = '', code = '') {
    super({
      code,
      details,
      message,
      status: HttpStatus.InternalServerError,
    });
  }
}
