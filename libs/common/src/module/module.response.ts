import { Module } from '@libs/common/src/module/module.interface';
import { ModuleFields } from '@libs/repositories/module.repository';
import { DateTimeUtil } from '@libs/utils/datetime.util';
import { plainToInstance } from 'class-transformer';

export function ModuleResponse(params: ModuleFields, groups: Module.Codes[]) {
  return plainToInstance<Module.Response, Module.Response>(Module.Response, {
    ID: params.ID,
    code: params.code,
    createdAt: DateTimeUtil.ToUtc(params.createdAt),
    name: params.name,
    updatedAt: DateTimeUtil.ToUtc(params.updatedAt),
  } as Module.Response, {
    excludeExtraneousValues: true,
    groups,
  });
}
