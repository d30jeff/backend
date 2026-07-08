import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  MethodNotAllowedException,
  UnauthorizedException,
} from '@libs/exceptions/http-exception';
import { System } from '@libs/interfaces/system/system.interface';
import {
  IsDefined,
  IsEmail,
  IsIn,
  MaxLength,
  MinLength,
} from '@libs/utils/class-validator.util';
import { Trim } from '@libs/utils/transformer.util';
import { IsOptional } from 'class-validator';

export namespace Auth {

  export const TOKEN = 'AUTH_PROVIDER';
  export type ModuleOptions = {
    allowSignUp?: boolean;
  };

  export const BearerRequestHeaderName = 'x-authorization';
  export const BearerResponseHeaderName = 'x-token';

  export namespace Exceptions {
    export const Codes = {
      EmailAlreadyTaken: 'EMAIL_ALREADY_TAKEN',
      InvalidBearerScheme: 'INVALID_BEARER_SCHEME',
      InvalidCsrfToken: 'INVALID_CSRF_TOKEN',
      InvalidIdToken: 'INVALID_ID_TOKEN',
      InvalidModule: 'INVALID_MODULE',
      InvalidSession: 'INVALID_SESSION',
      ProviderSessionExpired: 'PROVIDER_SESSION_EXPIRED',
      SignUpForbidden: 'SIGN_UP_FORBIDDEN',
    } as const;

    export type Codes = (typeof Codes)[keyof typeof Codes];

    export class SignUpForbidden extends MethodNotAllowedException {
      constructor(details = 'Sign up feature is disabled') {
        super('Sign Up Forbidden', details, Codes.SignUpForbidden);
      }
    }

    export class InvalidModule extends ForbiddenException {
      constructor(
        details = 'Your current module prevents you from signing up',
      ) {
        super('Invalid Module', details, Codes.InvalidModule);
      }
    }

    export class EmailAlreadyTaken extends ConflictException {
      constructor(details = 'The provided email is already taken') {
        super('Email Already Taken', details, Codes.EmailAlreadyTaken);
      }
    }

    export class InvalidBearerScheme extends BadRequestException {
      constructor(details = 'The provided scheme is in valid.') {
        super(
          'Invalid Bearer Scheme Provided',
          [],
          details,
          Codes.InvalidBearerScheme,
        );
      }
    }

    export class IdTokenExpired extends UnauthorizedException {
      constructor(details = 'The provided Firebase ID Token has expired.') {
        super(
          'Firebase ID Token Expired',
          details,
          Codes.ProviderSessionExpired,
        );
      }
    }
    export class MalformIdToken extends UnauthorizedException {
      constructor(details = 'The provided Firebase ID Token is not valid.') {
        super('Malformed Firebase ID Token', details, Codes.InvalidIdToken);
      }
    }

    export class InvalidSession extends UnauthorizedException {
      constructor(details = 'Session invalid or expired') {
        super('Invalid Session', details, Codes.InvalidSession);
      }
    }

    export class InvalidCsrfToken extends BadRequestException {
      constructor(details = 'Invalid CSRF Token') {
        super('Invalid CSRF Token', [], details, Codes.InvalidSession);
      }
    }
  }

  export namespace SignUp {
    export class Payload {
      @IsDefined()
      @IsEmail()
      @MaxLength(255)
      @Trim()
        email: string;

      @IsDefined()
      @MaxLength(40)
      @MinLength(12)
        password: string;
    }

    export type Params = System.WithModuleCode<Payload>;
  }

  export namespace SignIn {
    export class Payload extends SignUp.Payload {}
  }

  export namespace SignInWithProvider {
    export class Payload {
      @IsDefined()
        idToken: string;

      @IsOptional()
      @IsIn(['bearer'])
      // @JSONSchema({
      //   description: 'Example',
      //   example: 'bearer',
      //   type: 'null',
      // })
        type?: 'bearer';
    }

    export type Params = System.WithModuleCode<Payload>;
  }
}
