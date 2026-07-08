import { HttpStatus } from '@libs/enums/http-status.enum';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  PaymentRequiredException,
  TooManyRequestsException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@libs/exceptions/http-exception';

describe('Http Exception Test', () => {
  test('It Returns Expected 400 Response', () => {
    const exception = new BadRequestException('Hello', [], 'Missing required fields');
    expect(exception.code).toBe('HELLO');
    expect(exception.message).toBe('Hello');
    expect(exception.details).toBe('Missing required fields');
    expect(exception.statusCode).toBe(HttpStatus.BadRequest);
  });

  test('It Returns Expected 401 Response', () => {
    const exception = new UnauthorizedException('Invalid Credentials', 'Invalid username or password');
    expect(exception.code).toBe('INVALID_CREDENTIALS');
    expect(exception.details).toBe('Invalid username or password');
    expect(exception.statusCode).toBe(HttpStatus.Unauthorized);
  });

  test('It Returns Expected 402 Response', () => {
    const exception = new PaymentRequiredException('Payment Required', 'Subscription expired');
    expect(exception.code).toBe('PAYMENT_REQUIRED');
    expect(exception.details).toBe('Subscription expired');
    expect(exception.statusCode).toBe(HttpStatus.PaymentRequired);
  });

  test('It Returns Expected 403 Response', () => {
    const exception = new ForbiddenException('Forbidden', 'Insufficient permissions');
    expect(exception.code).toBe('FORBIDDEN');
    expect(exception.details).toBe('Insufficient permissions');
    expect(exception.statusCode).toBe(HttpStatus.Forbidden);
  });

  test('It Returns Expected 404 Response', () => {
    const exception = new NotFoundException('Not Found', 'Resource does not exist');
    expect(exception.code).toBe('NOT_FOUND');
    expect(exception.details).toBe('Resource does not exist');
    expect(exception.statusCode).toBe(HttpStatus.NotFound);
  });

  test('It Returns Expected 409 Response', () => {
    const exception = new ConflictException('Conflict', 'Resource already exists');
    expect(exception.code).toBe('CONFLICT');
    expect(exception.details).toBe('Resource already exists');
    expect(exception.statusCode).toBe(HttpStatus.Conflict);
  });

  test('It Returns Expected 422 Response', () => {
    const exception = new UnprocessableEntityException('Unprocessable Entity', 'Validation failed');
    expect(exception.code).toBe('UNPROCESSABLE_ENTITY');
    expect(exception.details).toBe('Validation failed');
    expect(exception.statusCode).toBe(HttpStatus.UnprocessableEntity);
  });

  test('It Returns Expected 429 Response', () => {
    const exception = new TooManyRequestsException('Too Many Requests', 'Rate limit exceeded');
    expect(exception.code).toBe('TOO_MANY_REQUESTS');
    expect(exception.details).toBe('Rate limit exceeded');
    expect(exception.statusCode).toBe(HttpStatus.TooManyRequests);
  });

  test('It Returns Expected 500 Response', () => {
    const exception = new InternalServerErrorException('Internal Server Error', 'Database connection failed');
    expect(exception.code).toBe('INTERNAL_SERVER_ERROR');
    expect(exception.details).toBe('Database connection failed');
    expect(exception.statusCode).toBe(HttpStatus.InternalServerError);
  });
});
