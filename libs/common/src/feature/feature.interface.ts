import { Module } from '@libs/common/src/module/module.interface';
import { System } from '@libs/interfaces/system/system.interface';
import { Expose } from 'class-transformer';

export namespace Feature {

  export const Codes = {
    Account: 'Account',
    Country: 'Country',
    Permission: 'Permission',
    Profile: 'Profile',
    Upload: 'Upload',
    Workspace: 'Workspace',
  } as const;

  export type Codes = (typeof Codes)[keyof typeof Codes];

  export class Response {
    @Expose()
      ID: string;

    @Expose()
      name: string;

    @Expose()
      code: System.Feature.Codes;
  }

  export namespace Create {
    export type Params = {
      name: string;
      code: System.Feature.Codes;
      moduleCode: Module.Codes
    };
  }

  export namespace FindOne {
    export type Params = Partial<Create.Params>;
  }
}
