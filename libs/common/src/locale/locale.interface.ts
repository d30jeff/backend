import { Module } from '@libs/common/src/module/module.interface';
import { System } from '@libs/interfaces/system/system.interface';
import { Expose } from 'class-transformer';

export namespace Locale {
  export const Codes = {
    BahasaMalaysia: 'ms-MY',
    ChineseSimplified: 'zh-Hans',
    ChineseTraditional: 'zh-Hant',
    EnglishUS: 'en-US',
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
      isActive: boolean;
  }

  export namespace List {
    export type Query = System.PaginationWithKeywords;
    export type QueryParams = Query;
    export type Params = System.Service.List.Params;
  }
}
