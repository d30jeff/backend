import { User } from '@libs/common/src/common';
import { Common } from '@libs/common/src/common.interface';
import { UserDevice } from '@libs/common/src/user-device/user-device.interface';
import { UserDeviceService } from '@libs/common/src/user-device/user-device.service';
import { CurrentUser } from '@libs/decorators/current-user.decorator';
import {
  Body,
  Controller,
  Inject,
  Put,
} from '@nestjs/common';

@Controller('/user-devices')
export class UserDeviceController {
  constructor(
    @Inject(Common.Provider) private readonly common: Common.ModuleOptions,
    private readonly userDeviceService: UserDeviceService,
  ) {

  }

  @Put('/')
  async register(@Body() body: UserDevice.Register.Payload, @CurrentUser() user: User.Response) {
    await this.userDeviceService.register({
      token: body.token,
      user: user,
    });
  }

}
