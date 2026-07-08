import { Module } from '@libs/common/src/module/module.interface';
import { ConflictException, NotFoundException } from '@libs/exceptions/http-exception';
import { System } from '@libs/interfaces/system/system.interface';
import { IsIn, MaxLength } from '@libs/utils/class-validator.util';
import { DateTimeUtil } from '@libs/utils/datetime.util';
import { PaginationQueries } from '@libs/utils/pagination.util';
import { Trim } from '@libs/utils/transformer.util';
import {
  Expose,
  Transform,
  Type,
} from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsOptional,
} from 'class-validator';

export namespace Country {
  export const Codes = {
    Malaysia: 'MY',
    Singapore: 'SG',
  } as const;

  export type Codes = (typeof Codes)[keyof typeof Codes];

  export class Response {
    @Expose()
      ID: string;

    @Expose()
      name: string;

    @Expose()
      code: string;

    @Expose({ groups: [Module.Codes.Admin] })
      isActive: boolean;

    @Expose({ groups: [Module.Codes.Admin] })
    @Transform((field) => {
      return DateTimeUtil.ToUtc(field.value);
    }, { toPlainOnly: true })
      createdAt: string;

    @Expose({ groups: [Module.Codes.Admin] })
    @Transform((field) => {
      return DateTimeUtil.ToUtc(field.value);
    }, { toPlainOnly: true })
      updatedAt: string;
  }

  export namespace Exceptions {
    export const Codes = {
      CountryAlreadyExists: 'COUNTRY_ALREADY_EXISTS',
      CountryCodeAlreadyExists: 'COUNTRY_CODE_ALREADY_EXISTS',
      CountryNotFound: 'COUNTRY_NOT_FOUND',
    } as const;

    export type Codes = (typeof Codes)[keyof typeof Codes];

    export class NotFound extends NotFoundException {
      constructor(details = 'Country not found or has been deleted') {
        super('Country Not Found', details, Codes.CountryNotFound);
      }
    }

    export class CountryCodeAlreadyExists extends ConflictException {
      constructor(details = 'Country code already exists') {
        super('Country Code Already Exists', details, Codes.CountryCodeAlreadyExists);
      }
    }

    export class AlreadyExists extends ConflictException {
      constructor(details = 'Country already exists') {
        super('Country Already Exists', details, Codes.CountryAlreadyExists);
      }
    }
  }

  export namespace Create {
    export class Payload {
      @IsDefined()
      @Trim()
      @MaxLength()
        name: string;

      @IsDefined()
      @Trim()
      @MaxLength()
        code: Codes;

      @IsDefined()
      @IsBoolean()
        isActive: boolean;
    }

    export type Params = System.Service.Create.Params<Payload>;
  }

  export namespace List {
    export class SortKeys {
      @IsOptional()
      @IsIn(Object.values(System.SortOrder))
        name?: System.SortOrder;
    }

    export class Query {
      @IsOptional()
      @MaxLength(50)
        keywords?: string;

      @IsOptional()
      @Type(() => SortKeys)
        sort?: SortKeys;
    }

    export type QueryParams = Query & PaginationQueries;

    export type Params = System.WithAuthenticatedUser<QueryParams>;
  }

  export namespace FindOne {
    export type Params = System.Service.FindOne.Params<{
      name?: string;
      code?: Codes;
    }>;
  }

  export namespace Update {
    export class Payload extends Create.Payload { }
    export type Params = System.Service.Update.Params<Payload>;
  }

  export namespace Delete {
    export type Params = System.Service.Delete.Params;
  }
}
