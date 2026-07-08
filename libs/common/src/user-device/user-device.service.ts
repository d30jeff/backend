import { UserDevice } from '@libs/common/src/user-device/user-device.interface';
import { Database } from '@libs/providers/database/database.interface';
import { UserDeviceRepository } from '@libs/repositories/user-device.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserDeviceService {
  constructor(
    @Inject(Database.TOKEN)
    private database: Database.Provider,
    private readonly userDeviceRepository: UserDeviceRepository,
  ) {
  }

  async register(params: UserDevice.Register.Params) {
    const {
      token, user,
    } = params;

    return this.userDeviceRepository.upsert({
      create: {
        User: { connect: { ID: user.ID } },
        token,
      },
      update: {
        User: { connect: { ID: user.ID } },
        token,
      },
      where: { token },
    });
  }
}
