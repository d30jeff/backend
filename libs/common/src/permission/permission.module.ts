import { ActionModule } from '@libs/common/src/action/action.module';
import { Common } from '@libs/common/src/common.interface';
import { CommonModule } from '@libs/common/src/common.module';
import { FeatureModule } from '@libs/common/src/feature/feature.module';
import { ModuleModule } from '@libs/common/src/module/module.module';
import { UserRoleModule } from '@libs/common/src/user-role/user-role.module';
import { DatabaseModule } from '@libs/providers/database/database.module';
import { PermissionRepository } from '@libs/repositories/permission.repository';
import { RoleRepository } from '@libs/repositories/role.repository';
import {
  DynamicModule,
  forwardRef,
  Module,
} from '@nestjs/common';

import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';

@Module({

})
export class PermissionModule {
  static forRoot(options: Common.ModuleOptions): DynamicModule {
    return {
      controllers: [PermissionController],
      exports: [PermissionRepository],
      imports: [
        forwardRef(() => ModuleModule),
        forwardRef(() => CommonModule),
        FeatureModule,
        ActionModule,
        // forwardRef(() => UserRoleModule),
        DatabaseModule,
        UserRoleModule.forRoot(options),
      ],
      module: PermissionModule,
      providers: [
        RoleRepository,
        PermissionRepository,
        PermissionService,
        {
          provide: Common.Provider,
          useValue: options.module,
        },
      ],
    };
  }
}
