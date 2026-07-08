import { Locale } from '@libs/common/src/locale/locale.interface';
import { Module } from '@libs/common/src/module/module.interface';
import { LocaleFields } from '@libs/repositories/locale.repository';
import { plainToInstance } from 'class-transformer';

export function LocaleResponse(params: LocaleFields, groups: Module.Codes[]) {
  return plainToInstance<Locale.Response, Partial<LocaleFields>>(Locale.Response, {
    ID: params.ID,
    code: params.code,
    createdAt: params.createdAt,
    isActive: params.isActive,
    name: params.name,
    updatedAt: params.updatedAt,
  }, {
    excludeExtraneousValues: true,
    groups,
  });
}
