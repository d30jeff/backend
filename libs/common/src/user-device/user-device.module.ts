import { Common } from '@libs/common/src/common.interface';
import { UserModule } from '@libs/common/src/user/user.module';
import { UserDeviceController } from '@libs/common/src/user-device/user-device.controller';
import { UserDeviceService } from '@libs/common/src/user-device/user-device.service';
import { DatabaseModule } from '@libs/providers/database/database.module';
import { UserDeviceRepository } from '@libs/repositories/user-device.repository';
import { DynamicModule, Module } from '@nestjs/common';
@Module({})
export class UserDeviceModule {
  static forRoot(options: Common.ModuleOptions): DynamicModule {
    return {
      controllers: [UserDeviceController],
      imports: [DatabaseModule, UserModule.forRoot(options)],
      module: UserDeviceModule,
      providers: [
        {
          provide: Common.Provider,
          useValue: options,
        },
        UserDeviceRepository,
        UserDeviceService,
      ],
    };
  }
}
