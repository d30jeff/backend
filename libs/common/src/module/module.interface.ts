import { NotFoundException } from '@libs/exceptions/http-exception';
import { System } from '@libs/interfaces/system/system.interface';
import { DateTimeUtil } from '@libs/utils/datetime.util';
import { Expose, Transform } from 'class-transformer';

export namespace Module {
  export const Codes = {
    Admin: 'ADMIN',
    Business: 'BUSINESS',
    Consumer: 'CONSUMER',
    Partner: 'PARTNER',
  } as const;

  export type Codes = (typeof Codes)[keyof typeof Codes];

  export class Response {
    @Expose()
      ID: string;

    @Expose()
      name: string;

    @Expose()
      code: Codes;

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
    export const Codes = { ModuleNotFound: 'MODULE_NOT_FOUND' } as const;

    export type Codes = (typeof Codes)[keyof typeof Codes];

    export class NotFound extends NotFoundException {
      constructor(details = 'The requested module could not be found') {
        super('Module not found', details, Codes.ModuleNotFound);
      }
    }
  }

  export namespace Create {
    export type Params = {
      name: string;
      code: Codes;
    };
  }

  export namespace FindOne {
    export type Params = System.Service.FindOne.Params<{
      code?: Codes
    }>;
  }
}
