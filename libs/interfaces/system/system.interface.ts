import { Module } from '@libs/common/src/module/module.interface';
import { Permission } from '@libs/common/src/permission/permission.interface';
import { User } from '@libs/common/src/user/user.interface';
import { IsDefined, MaxLength } from '@libs/utils/class-validator.util';
import { PaginationQueries } from '@libs/utils/pagination.util';
import { Expose } from 'class-transformer';
import { IsDateString, IsOptional } from 'class-validator';

export namespace System {
  export const Environments = {
    Development: 'development',
    Production: 'production',
    Staging: 'staging',
    Testing: 'testing',
  };

  export type Environments = (typeof Environments)[keyof typeof Environments];

  export const Locations = {
    Body: 'body',
    Headers: 'headers',
    Params: 'params',
    Query: 'query',
  } as const;

  export type Locations = (typeof Locations)[keyof typeof Locations];

  export namespace Errors {
    export const Codes = {
      InternalServerError: 'InternalServerError',
      ValidationError: 'ValidationError',
    } as const;

    export type Codes = (typeof Codes)[keyof typeof Codes];
  }

  export type WithAuthenticatedUser<T> = T & {
    moduleCode?: Module.Codes;
    user: User.Response;
    userPermissions?: Permission.UserPermission;
  };

  export type WithModuleCode<T> = T & {
    moduleCode: Module.Codes;
  };

  export class SearchKeywordsQuery {
    @IsOptional()
    @MaxLength(100)
      keywords?: string;
  }

  export class DateRangeQuery {
    @IsOptional()
    @IsDateString()
      from?: string;

    @IsOptional()
    @IsDateString()
      to?: string;
  }

  export class OrganizationIDQuery {
    @IsDefined()
    @MaxLength(50)
      organizationID: string;
  }

  export class Response {
    @Expose()
      ID: string;

    @Expose()
      createdAt: string;

    @Expose()
      updatedAt: string;
  }

  export namespace Service {
    export namespace Create {
      export type Params<T> = WithAuthenticatedUser<T>;
    }

    export namespace List {
      export type Params<T = void> = WithAuthenticatedUser<T extends void
        ? SearchKeywordsQuery & PaginationQueries
        : SearchKeywordsQuery & PaginationQueries & T>;
    }

    export namespace FindOne {
      export type Options = {
        throwIfNotFound?: boolean;
        throwIfExists?: boolean;
      };
      export type Params<T = void> = T extends void
        ? { ID?: string; options?: Options }
        : { ID?: string; options?: Options } & T;
    }

    export namespace Update {
      export type Params<T = void> = Required<Pick<FindOne.Params<T>, 'ID'>> &
        Omit<FindOne.Params<T>, 'ID'>;
    }

    export namespace Delete {
      export type Params<T = void> = Required<Pick<FindOne.Params<T>, 'ID'>> &
        Omit<FindOne.Params<T>, 'ID'>;
    }
  }

  export type PaginationWithKeywords<T = void> = T extends void
    ? SearchKeywordsQuery & PaginationQueries
    : SearchKeywordsQuery & PaginationQueries & T;

  export const SortOrder = {
    asc: 'asc',
    desc: 'desc',
  } as const;

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export namespace Feature {
    export const Codes = {
      Account: 'ACCOUNT',
      Appointment: 'APPOINTMENT',
      Asset: 'ASSET',
      Branch: 'BRANCH',
      BusinessCard: 'BUSINESS_CARD',
      Country: 'COUNTRY',
      Customer: 'CUSTOMER',
      Dashboard: 'DASHBOARD',
      Document: 'DOCUMENT',
      Invoice: 'INVOICE',
      Module: 'MODULE',
      Organization: 'ORGANIZATION',
      Permission: 'PERMISSION',
      Preference: 'PREFERENCE',
      Product: 'PRODUCT',
      Profile: 'PROFILE',
      Property: 'PROPERTY',
      Queue: 'QUEUE',
      Quotation: 'QUOTATION',
      Resume: 'RESUME',
      Service: 'SERVICE',
      Stock: 'STOCK',
      Transaction: 'TRANSACTION',
      User: 'USER',
      Vendor: 'VENDOR',
      WorkingExperience: 'WORKING_EXPERIENCE',
      Workspace: 'WORKSPACE',
      WorkspaceMember: 'WORKSPACE_MEMBER',
    } as const;

    export type Codes = (typeof Codes)[keyof typeof Codes];
  }

  // // export namespace Role {
  // //   export const Codes = {
  // //     Accountant: 'ACCOUNTANT',
  // //     All: 'ALL',
  // //     Cashier: 'CASHIER',
  // //     Developer: 'DEVELOPER',
  // //     Manager: 'MANAGER',
  // //     Owner: 'OWNER',
  // //     Receptionist: 'RECEPTIONIST',
  // //     Sales: 'SALES',
  // //     Staff: 'STAFF',
  // //     SuperAdmin: 'SUPER_ADMIN',
  // //     Supervisor: 'SUPERVISOR',
  // //     Teacher: 'TEACHER',
  // //   } as const;

  //   export type Codes = (typeof Codes)[keyof typeof Codes];
  // }
}
