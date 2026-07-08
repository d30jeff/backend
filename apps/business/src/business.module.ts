import { Module } from '@nestjs/common';

import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';

@Module({
  controllers: [BusinessController],
  imports: [],
  providers: [BusinessService],
})
export class BusinessModule {}
