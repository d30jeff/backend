
import { InternalServerErrorException } from '@libs/exceptions/http-exception';
import { HttpException } from '@libs/exceptions/http-exception.interface';
import { Metadata } from '@libs/interceptors/response/metadata';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException as NestHttpException,
  HttpStatus,
  Logger,
  ValidationError,
} from '@nestjs/common';
import { Response } from 'express';

export const extractPropertiesAndConstraint = (
  validationErrors: ValidationError[],
  errors: any[],
  property: string = '',
) => {

  for (const validationError of validationErrors) {
    if (validationError.children) {
      for (const child of validationError.children) {
        extractPropertiesAndConstraint(
          [child],
          errors,
          [property || validationError.property, child.property].join('.'),
        );
      }
    }

    if (validationError.constraints) {
      errors.push({ [property || validationError.property]: validationError.constraints });
    }

  }
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    this.logger.error(exception, exception?.stack);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException.Instance) {
      status = exception.statusCode;
    } else if (exception instanceof NestHttpException) {
      this.logger.log('Handling Nest HTTP exception');
      // TODO: Handle Nest exceptions
      status = exception.getStatus();

      if (status === HttpStatus.NOT_FOUND) {
        return response.status(HttpStatus.NOT_FOUND).json({
          error: {
            code: 'RouteNotFound',
            details: 'Route does not exist',
            message: 'Route not found',
            statusCode: status,
          },
          metadata: new Metadata(host),
        });
      }

    }

    const error =
      exception instanceof HttpException.Instance
        ? exception
        : new InternalServerErrorException();

    response.status(status).json({
      error,
      metadata: new Metadata(host),
    });
  }
}
