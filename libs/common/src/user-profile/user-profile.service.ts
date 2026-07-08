import { Profile } from '@libs/common/src/profile/profile.interface';
import { UserService } from '@libs/common/src/user/user.service';
import { Prisma } from '@libs/prisma/client';
import { UserProfileRepository } from '@libs/repositories/user-profile.repository';
import { dayjs } from '@libs/utils/dayjs.util';
import {
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class UserProfileService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly userProfileRepository: UserProfileRepository,
  ) {}

  async update(params: Profile.Update.Params, tx?: Prisma.TransactionClient) {
    const {
      firstName,
      lastName,
      uploadID,
      userID,
      gender,
      dateOfBirth,
    } = params;

    const user = await this.userService.findOne({ ID: userID }, tx);

    const data = {
      User: { connect: { ID: user.ID } },
      firstName,
      lastName,
    } as Prisma.UserProfileCreateInput;

    if (gender) {
      data.gender = gender;
    }

    if (dateOfBirth) {
      data.dateOfBirth = dayjs(dateOfBirth).toDate();
    }

    if (uploadID) {
      data.Upload = { connect: { ID: uploadID } };
    }

    return this.userProfileRepository.upsert({
      create: data,
      update: { ...data },
      where: { userID: user.ID },
    }, tx);
  }

  getByUserID(userID: string) {
    return this.userProfileRepository.findFirst({ where: { userID } });
  }
}
