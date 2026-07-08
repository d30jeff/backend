import { Common } from '@libs/common/src/common.interface';
import { ConfigProvider } from '@libs/providers/config/config.provider';
import { DatabaseModule } from '@libs/providers/database/database.module';
import { DatabaseProvider } from '@libs/providers/database/database.provider';
import { RedisProvider } from '@libs/services/redis/redis.provider';
import {
  DynamicModule,
  forwardRef,
  Module,
} from '@nestjs/common';

import { FirebaseModule } from '../../providers/firebase/firebase.module';
import { ActionModule } from './action/action.module';
import { CommonService } from './common.service';
import { EmailModule } from './email/email.module';
import { FeatureModule } from './feature/feature.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { LocaleModule } from './locale/locale.module';
import { ModuleModule } from './module/module.module';
import { PermissionModule } from './permission/permission.module';
import { PreferenceModule } from './preference/preference.module';
import { RoleModule } from './role/role.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { UserRoleModule } from './user-role/user-role.module';
import { CountryModule } from './country/country.module';
import { UserDeviceModule } from './user-device/user-device.module';

@Module({
  imports: [CountryModule, UserDeviceModule]
})
export class CommonModule {
  static forRoot(options: Common.ModuleOptions): DynamicModule {
    return {
      exports: [
        DatabaseModule,
        CommonService,
        DatabaseProvider,
        ConfigProvider,
        RedisProvider,
        ModuleModule,
        RoleModule,
        forwardRef(() => FeatureModule),
        ActionModule,
        PermissionModule,
        UserModule.forRoot(options),
        FirebaseModule,
        PreferenceModule,
        UserProfileModule,
      ],
      imports: [
        forwardRef(() => ModuleModule),
        DatabaseModule,
        UserModule,
        forwardRef(() => PermissionModule),
        forwardRef(() => FeatureModule),
        ActionModule,
        RoleModule,
        UploadModule.forRoot({
          module: options.module,
        }),
        HealthCheckModule.forRoot({
          module: options.module,
        }),
        EmailModule,
        UserRoleModule,
        FirebaseModule,
        UserProfileModule,
        PreferenceModule.forRoot({
          module: options.module,
        }),
        LocaleModule,
      ],
      module: CommonModule,
      providers: [
        CommonService, DatabaseProvider, ConfigProvider, RedisProvider, {
          provide: Common.Provider,
          useValue: options.module,
        },
      ],
    };
  }

}
