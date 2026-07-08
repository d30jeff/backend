import { Module } from '@libs/common/src/module/module.interface';
import { ConflictException, NotFoundException } from '@libs/exceptions/http-exception';
import { System } from '@libs/interfaces/system/system.interface';
import { Expose } from 'class-transformer';

export namespace Role {
  export const Codes = {
    Shareholder: 'Shareholder',
    SuperAdmin: 'SuperAdmin',
  } as const;

  export type Codes = (typeof Codes)[keyof typeof Codes];

  export class Response {
    @Expose()
      ID: string;

    @Expose()
      code: Codes;
  }

  export namespace Exceptions {
    export const Codes = {
      AlreadyExists: 'ROLE_ALREADY_EXISTS',
      NotFound: 'ROLE_NOT_FOUND',
    } as const;

    export class NotFound extends NotFoundException {
      constructor(details = 'Role not found or has been deleted') {
        super('Not found', details, Codes.NotFound);
      }
    }

    export class AlreadyExists extends ConflictException {
      constructor(details = 'Role already exists') {
        super('Already exists', details, Codes.AlreadyExists);
      }
    }
  }

  export namespace Create {
    export type Params = {
      name: string;
      code: Codes;
      moduleCode: Module.Codes;
    };
  }

  export namespace FindOne {
    export type Params = System.Service.FindOne.Params<{
      code?: Codes,
      moduleCode: Module.Codes,
    }>;
  }
}
