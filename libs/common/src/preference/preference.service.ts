import { Locale } from '@libs/common/src/locale/locale.interface';
import { Preference } from '@libs/common/src/preference/preference.interface';
import { Prisma } from '@libs/prisma/client';
import { generateID } from '@libs/providers/nanoid.provider';
import { UserPreferenceRepository } from '@libs/repositories/user-preference.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PreferenceService {

  constructor(private readonly userPreferenceRepository: UserPreferenceRepository) {}

  get(userID: string) {
    return this.userPreferenceRepository.findFirst({ where: { userID } });
  }

  update(params: Preference.Update.Params, tx?: Prisma.TransactionClient) {
    const {
      appearance = Preference.Appearance.System,
      locale = Locale.Codes.EnglishUS,
      userID,
    } = params;

    return this.userPreferenceRepository.upsert({
      create: {
        ID: generateID('preference'),
        Locale: { connect: { code: locale } },
        User: { connect: { ID: userID } },
        appearance,
      },
      update: {
        Locale: { connect: { code: locale } },
        appearance,
      },
      where: { userID },
    }, tx);
  }
}
