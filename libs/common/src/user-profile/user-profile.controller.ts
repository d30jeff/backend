import { Common } from '@libs/common/src/common.interface';
import { User } from '@libs/common/src/user/user.interface';
import { UserProfileResponse } from '@libs/common/src/user-profile/user-profile.response';
import { UserProfileService } from '@libs/common/src/user-profile/user-profile.service';
import { CurrentUser } from '@libs/decorators/current-user.decorator';
import type { ExpressRequest } from '@libs/interfaces/express.interface';
import {
  Controller,
  Get,
  Inject,
  Put,
  Request,
} from '@nestjs/common';

@Controller('profile')
export class UserProfileController {
  constructor(
    private readonly userProfileService: UserProfileService,
    @Inject(Common.Provider) private readonly common: Common.ModuleOptions,
  ) {}

  @Get()
  async get(
    @Request() request: ExpressRequest,
    @CurrentUser() user: User.Response,
  ) {
    const data = await this.userProfileService.getByUserID(user.ID);

    return UserProfileResponse(data, [this.common.module]);
  }

  @Put()
  async update(
    @Request() request: ExpressRequest,
    @CurrentUser() user: User.Response,
  ) {

    const data = await this.userProfileService.getByUserID(user.ID);

    return UserProfileResponse(data, [this.common.module]);
  }
}
