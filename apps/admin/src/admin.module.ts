import { ActionModule } from '@libs/common/src/action/action.module';
import { AuthModule } from '@libs/common/src/auth/auth.module';
import { CommonModule } from '@libs/common/src/common.module';
import { FeatureModule } from '@libs/common/src/feature/feature.module';
import { ModuleModule } from '@libs/common/src/module/module.module';
import { ModuleService } from '@libs/common/src/module/module.service';
import { PermissionModule } from '@libs/common/src/permission/permission.module';
import { PermissionService } from '@libs/common/src/permission/permission.service';
import { RoleModule } from '@libs/common/src/role/role.module';
import { UserModule } from '@libs/common/src/user/user.module';
import { UserDeviceModule } from '@libs/common/src/user-device/user-device.module';
import { UserProfileModule } from '@libs/common/src/user-profile/user-profile.module';
import { UserRoleModule } from '@libs/common/src/user-role/user-role.module';
import { AllExceptionsFilter } from '@libs/filters/all-exceptions.filter';
import { ConfigProvider } from '@libs/providers/config/config.provider';
import { DatabaseModule } from '@libs/providers/database/database.module';
import { Firebase } from '@libs/providers/firebase/firebase.interface';
import { FirebaseProvider } from '@libs/providers/firebase/firebase.provider';
import { JwtProvider } from '@libs/providers/jwt/jwt.provider';
import { ModuleRepository } from '@libs/repositories/module.repository';
import {
  forwardRef,
  Module,
  OnModuleInit,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

@Module({
  controllers: [],
  imports: [
    forwardRef(() => CommonModule.forRoot({
      module: 'ADMIN',
    })),
    DatabaseModule,
    forwardRef(() => AuthModule.forRoot({
      module: 'ADMIN',
    }, {
      allowSignUp: false,
    })),
    ModuleModule,
    UserModule,
    RoleModule,
    FeatureModule,
    ActionModule,
    UserDeviceModule.forRoot({
      module: 'ADMIN',
    }),
    PermissionModule.forRoot({
      module: 'ADMIN',
    }),
    UserProfileModule.forRoot({
      module: 'ADMIN',
    }),
    UserRoleModule.forRoot({ module: 'ADMIN' }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: Firebase.TOKEN,
      useValue: FirebaseProvider,
    },
    ConfigProvider,
    JwtProvider,
    ModuleRepository,
    ModuleService,
    PermissionService,
  ],
})
export class AdminModule implements OnModuleInit {
  constructor(private readonly permissionService: PermissionService) {}

  async onModuleInit() {
    await this.permissionService.populate('ADMIN');
  }

}
