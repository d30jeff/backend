import { DatabaseModule } from '@libs/providers/database/database.module';
import { FeatureRepository } from '@libs/repositories/feature.repository';
import { Module } from '@nestjs/common';

import { FeatureService } from './feature.service';

@Module({
  exports: [FeatureRepository, FeatureService],
  imports: [DatabaseModule],
  providers: [FeatureRepository, FeatureService],
})
export class FeatureModule {}
