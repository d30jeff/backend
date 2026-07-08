import { Common } from '@libs/common/src/common.interface';
import { ModuleModule } from '@libs/common/src/module/module.module';
import { ModuleService } from '@libs/common/src/module/module.service';
import { PreferenceModule } from '@libs/common/src/preference/preference.module';
import { RoleService } from '@libs/common/src/role/role.service';
import { UserModule } from '@libs/common/src/user/user.module';
import { UserService } from '@libs/common/src/user/user.service';
import { DatabaseModule } from '@libs/providers/database/database.module';
import { RoleRepository } from '@libs/repositories/role.repository';
import { UserProfileRepository } from '@libs/repositories/user-profile.repository';
import { UserRoleRepository } from '@libs/repositories/user-role.repository';
import {
  DynamicModule,
  forwardRef,
  Module,
} from '@nestjs/common';

import { UserProfileController } from './user-profile.controller';
import { UserProfileService } from './user-profile.service';

@Module({})
export class UserProfileModule {
  static forRoot(options: Common.ModuleOptions): DynamicModule {
    return {
      controllers: [UserProfileController],
      exports: [UserProfileRepository, UserProfileService],
      imports: [
        DatabaseModule,
        PreferenceModule.forRoot(options),
        forwardRef(() => UserModule),
        ModuleModule,
      ],
      module: UserProfileModule,
      providers: [
        UserService,
        UserProfileRepository,
        UserProfileService,
        ModuleService,
        RoleService,
        RoleRepository,
        UserRoleRepository,
        {
          provide: Common.Provider,
          useValue: options,
        },
      ],
    };
  }
}
