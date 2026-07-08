import { Module } from '@libs/common/src/module/module.interface';
import { Role } from '@libs/common/src/role/role.interface';
import { ConflictException, NotFoundException } from '@libs/exceptions/http-exception';
import { System } from '@libs/interfaces/system/system.interface';
import { Expose } from 'class-transformer';

export namespace UserRole {

  export class Response {
    @Expose()
      ID: string;
  }

  export namespace Exceptions {
    export const Codes = {
      UserRoleAlreadyExists: 'USER_ROLE_ALREADY_EXISTS',
      UserRoleNotFound: 'USER_ROLE_NOT_FOUND',
    } as const;

    export type Codes = (typeof Codes)[keyof typeof Codes];

    export class NotFound extends NotFoundException {
      // FIXME: Better copywriting
      constructor(details = 'The user with given role for the application does not exist') {
        super('User role for application not found', Codes.UserRoleNotFound, details);
      }
    }
    export class AlreadyExists extends ConflictException {
      // FIXME: Better copywriting
      constructor(details = 'The user with role is already a member of the application') {
        super('User role already part of application', Codes.UserRoleAlreadyExists, details);
      }
    }
  }

  export namespace Create {
    export class Payload { }
    export type Params = {
      userID: string;
      roleCode: Role.Codes;
      moduleCode: Module.Codes
    };

  }

  export namespace List {
    export type Params = System.WithAuthenticatedUser<any>;
  }

  export namespace FindOne {
    export type Params = System.Service.FindOne.Params;
  }

  export namespace Update {
    export type Params = System.Service.Update.Params;
  }

  export namespace Delete {
    export type Params = System.Service.Delete.Params;
  }
}
