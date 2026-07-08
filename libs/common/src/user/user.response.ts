import { Module } from '@libs/common/src/module/module.interface';
import { ModuleResponse } from '@libs/common/src/module/module.response';
import { ProfileResponse } from '@libs/common/src/profile/profile.response';
import { User } from '@libs/common/src/user/user.interface';
import { UserFields } from '@libs/repositories/user.repository';
import { DateTimeUtil } from '@libs/utils/datetime.util';
import { plainToInstance } from 'class-transformer';

export async function UserResponse(params: UserFields, groups: Module.Codes[]) {
  return plainToInstance<User.Response, User.Response>(User.Response, {
    ID: params.ID,
    Module: ModuleResponse(params.Module, groups),
    Profile: await ProfileResponse(params.Profile!, groups),
    createdAt: DateTimeUtil.ToUtc(params.createdAt),
    email: params.email,
    phone: params.phone,
    updatedAt: DateTimeUtil.ToUtc(params.updatedAt),
    verifiedAt: DateTimeUtil.ToUtc(params.verifiedAt),
  } as User.Response, {
    excludeExtraneousValues: true,
    groups,
  });
}
