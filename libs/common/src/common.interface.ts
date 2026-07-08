import { Module } from '@libs/common/src/module/module.interface';

export namespace Common {
  export const Provider = 'COMMON_PROVIDER';

  export type ModuleOptions = {
    module: Module.Codes;
  };
}
