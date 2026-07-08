import { Common } from '@libs/common/src/common.interface';
import { FeatureModule } from '@libs/common/src/feature/feature.module';
import { ModuleModule } from '@libs/common/src/module/module.module';
import { RoleModule } from '@libs/common/src/role/role.module';
import { UserModule } from '@libs/common/src/user/user.module';
import { DatabaseModule } from '@libs/providers/database/database.module';
import { UserRoleRepository } from '@libs/repositories/user-role.repository';
import {
  DynamicModule,
  forwardRef,
  Module,
} from '@nestjs/common';

import { UserRoleService } from './user-role.service';

@Module({})
export class UserRoleModule {
  static forRoot(options: Common.ModuleOptions): DynamicModule {
    return {
      exports: [UserRoleRepository, UserRoleService],
      imports: [
        DatabaseModule,
        forwardRef(() => ModuleModule),
        UserModule.forRoot(options),
        RoleModule,
        FeatureModule,
      ],
      module: UserRoleModule,
      providers: [UserRoleRepository, UserRoleService, {
        provide: Common.Provider,
        useValue: options.module,
      }],
    };
  }
}
