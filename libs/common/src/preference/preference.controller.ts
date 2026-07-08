import { Common } from '@libs/common/src/common.interface';
import { PreferenceResponse } from '@libs/common/src/preference/preference.response';
import { PreferenceService } from '@libs/common/src/preference/preference.service';
import type { ExpressRequest } from '@libs/interfaces/express.interface';
import {
  Controller,
  Get,
  Inject,
  Request,
} from '@nestjs/common';

@Controller('preference')
export class PreferenceController {
  constructor(
    @Inject(Common.Provider) private readonly common: Common.ModuleOptions,
    private readonly preferenceService: PreferenceService,
  ) {}

  @Get('/')
  async get(
    @Request() request: ExpressRequest,
  ) {
    const data = await this.preferenceService.get(request.session.user.ID);
    return PreferenceResponse(data, [this.common.module]);
  }
}
