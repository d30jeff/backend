import { Common } from '@libs/common/src/common.interface';
import { HealthCheckController } from '@libs/common/src/health-check/health-check.controller';
import { DynamicModule, Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [],
})
export class HealthCheckModule {
  static forRoot(options: Common.ModuleOptions): DynamicModule {
    return {
      controllers: [HealthCheckController],
      module: HealthCheckModule,
      providers: [
        {
          provide: Common.Provider,
          useValue: options.module,
        },
      ],
    };
  }
}
