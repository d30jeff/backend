import { LocaleResponse } from '@libs/common/src/locale/locale.response';
import { Module } from '@libs/common/src/module/module.interface';
import { Preference } from '@libs/common/src/preference/preference.interface';
import { UserPreferenceFields } from '@libs/repositories/user-preference.repository';
import { DateTimeUtil } from '@libs/utils/datetime.util';
import { plainToInstance } from 'class-transformer';

export function PreferenceResponse(params: UserPreferenceFields, groups: Module.Codes[]) {
  return plainToInstance<Preference.Response, Preference.Response>(Preference.Response, {
    Locale: LocaleResponse(params.Locale, groups),
    appearance: params.appearance,
    setAt: DateTimeUtil.ToUtc(params.setAt),
  } as Preference.Response, {
    excludeExtraneousValues: true,
    groups,
  });
}
