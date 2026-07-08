import { Common } from '@libs/common/src/common.interface';
import {
  Controller,
  Get,
  Inject,
} from '@nestjs/common';

@Controller('/health-check')
export class HealthCheckController {
  constructor(
    @Inject(Common.Provider) private readonly module: string,

  ) { }

  @Get()
  get() {
    return {
      application: this.module,
      status: '🚀 Service is up and running',
    };
  }
}
