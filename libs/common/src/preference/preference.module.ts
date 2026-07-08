import { Common } from '@libs/common/src/common.interface';
import { DatabaseModule } from '@libs/providers/database/database.module';
import { UserPreferenceRepository } from '@libs/repositories/user-preference.repository';
import { RedisModule } from '@libs/services/redis/redis.module';
import { DynamicModule, Module } from '@nestjs/common';

import { PreferenceController } from './preference.controller';
import { PreferenceService } from './preference.service';

@Module({})
export class PreferenceModule {
  static forRoot(options: Common.ModuleOptions): DynamicModule {
    return {
      controllers: [PreferenceController],
      exports: [UserPreferenceRepository, PreferenceService],
      imports: [DatabaseModule, RedisModule],
      module: PreferenceModule,
      providers: [UserPreferenceRepository, PreferenceService, {
        provide: Common.Provider,
        useValue: options,
      }],
    };
  }
}
