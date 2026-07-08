
import { UserProfile } from '@libs/common/src/common';
import { Module } from '@libs/common/src/module/module.interface';
import { Role } from '@libs/common/src/role/role.interface';
import { NotFoundException } from '@libs/exceptions/http-exception';
import { System } from '@libs/interfaces/system/system.interface';
import { DateTimeUtil } from '@libs/utils/datetime.util';
import {
  Expose,
  Transform,
  Type,
} from 'class-transformer';

export namespace User {

  export class Response {
    @Expose()
      ID: string;

    @Expose()
      email: string;

    @Expose()
      phone: string;

    @Expose({ groups: [Module.Codes.Admin] })
    @Type(() => Module.Response)
      Module: Module.Response;

    @Expose()
    @Type(() => UserProfile.Response)
      Profile: UserProfile.Response;

    @Expose({ groups: [Module.Codes.Admin] })
    @Transform((field) => {
      return DateTimeUtil.ToUtc(field.value);
    }, { toClassOnly: true })
      createdAt: string;

    @Expose({ groups: [Module.Codes.Admin] })
    @Transform((field) => {
      return DateTimeUtil.ToUtc(field.value);
    }, { toClassOnly: true })
      updatedAt: string;

    @Expose()
    @Transform((field) => {
      return DateTimeUtil.ToUtc(field.value);
    }, { toClassOnly: true })
      verifiedAt: string;
  }

  export namespace Exceptions {
    export const Codes = { UserNotFound: 'USER_NOT_FOUND' } as const;

    export type Codes = (typeof Codes)[keyof typeof Codes];

    export class NotFound extends NotFoundException {
      constructor(details = 'The user you are looking for does not exist') {
        super('User Not Found', details, Codes.UserNotFound);
      }
    }
  }

  export namespace FindOne {
    export type Params = System.Service.FindOne.Params<{
      email?: string;
      moduleCode?: Module.Codes;
      stripeCustomerID?: string;
    }>;
  }

  export namespace Create {
    export type Params = {
      email: string;
      phone?: string;
      password?: string;
      firstName?: string;
      lastName?: string;
      imageUrl?: string;
      moduleCode: Module.Codes;
      roleCode: Role.Codes;
      sendVerificationEmail?: boolean,
    };
  }

  export namespace AssignRole {
    export type Params = {
      moduleCode: Module.Codes;
      roleCode: Role.Codes;
      userID: string;
    };
  }
}
