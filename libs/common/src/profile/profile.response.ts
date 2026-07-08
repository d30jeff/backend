import { Module } from '@libs/common/src/module/module.interface';
import { Profile } from '@libs/common/src/profile/profile.interface';
import { UserProfileFields } from '@libs/repositories/user-profile.repository';
import { DateTimeUtil } from '@libs/utils/datetime.util';
import { plainToInstance } from 'class-transformer';

export async function ProfileResponse(params: UserProfileFields, groups: Module.Codes[]) {
  return plainToInstance<Profile.Response, Profile.Response>(Profile.Response, {
    dateOfBirth: DateTimeUtil.ToUtc(params?.dateOfBirth),
    firstName: params.firstName,
    gender: params.gender,
    lastName: params.lastName,
    profileCompletedAt: DateTimeUtil.ToUtc(params.profileCompletedAt),
    updatedAt: DateTimeUtil.ToUtc(params.updatedAt),
  } as Profile.Response, {
    groups,
  });

}
