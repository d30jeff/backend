import { Common } from '@libs/common/src/common.interface';
import { CountryController } from '@libs/common/src/country/country.controller';
import { CountryService } from '@libs/common/src/country/country.service';
import { DatabaseModule } from '@libs/providers/database/database.module';
import { DynamicModule, Module } from '@nestjs/common';
@Module({})
export class CountryModule {
  static forRoot(options: Common.ModuleOptions): DynamicModule {
    return {
      controllers: [CountryController],
      imports: [DatabaseModule],
      module: CountryModule,
      providers: [
        {
          provide: Common.Provider,
          useValue: options,
        },
        CountryService,
      ],
    };
  }
}
