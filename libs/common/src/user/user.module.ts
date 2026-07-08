import { Common } from '@libs/common/src/common.interface';
import { CommonModule } from '@libs/common/src/common.module';
import { ModuleModule } from '@libs/common/src/module/module.module';
import { PreferenceModule } from '@libs/common/src/preference/preference.module';
import { PreferenceService } from '@libs/common/src/preference/preference.service';
import { RoleService } from '@libs/common/src/role/role.service';
import { UserService } from '@libs/common/src/user/user.service';
import { UserProfileModule } from '@libs/common/src/user-profile/user-profile.module';
import { UserProfileService } from '@libs/common/src/user-profile/user-profile.service';
import { ConfigProvider } from '@libs/providers/config/config.provider';
import { DatabaseProvider } from '@libs/providers/database/database.provider';
import { RoleRepository } from '@libs/repositories/role.repository';
import { UserRepository } from '@libs/repositories/user.repository';
import { UserProfileRepository } from '@libs/repositories/user-profile.repository';
import { UserRoleRepository } from '@libs/repositories/user-role.repository';
import {
  DynamicModule,
  forwardRef,
  Module,
} from '@nestjs/common';

@Module({})
export class UserModule {
  static forRoot(options: Common.ModuleOptions): DynamicModule {
    return {
      exports: [UserRepository, UserService],
      imports: [
        forwardRef(() => CommonModule),
        forwardRef(() => UserProfileModule),
        PreferenceModule.forRoot({
          module: options.module,
        }),
        ModuleModule,
      ],
      module: UserModule,
      providers: [
        ConfigProvider,
        PreferenceService,
        UserProfileRepository,
        UserProfileService,
        DatabaseProvider,
        UserRepository,
        UserRoleRepository,
        RoleRepository,
        UserService,
        RoleService,
        {
          provide: Common.Provider,
          useValue: options.module,
        },
      ],
    };
  }
}
