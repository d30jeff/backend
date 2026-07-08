import { AuthController } from '@libs/common/src/auth/auth.controller';
import { Auth } from '@libs/common/src/auth/auth.interface';
import { AuthService } from '@libs/common/src/auth/auth.service';
import { Common } from '@libs/common/src/common.interface';
import { UserModule } from '@libs/common/src/user/user.module';
import { DatabaseModule } from '@libs/providers/database/database.module';
import { FirebaseModule } from '@libs/providers/firebase/firebase.module';
import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class AuthModule {
  static forRoot(options: Common.ModuleOptions, authOptions?: Auth.ModuleOptions): DynamicModule {
    return {
      controllers: [AuthController],
      imports: [DatabaseModule, UserModule.forRoot(options), FirebaseModule],
      module: AuthModule,
      providers: [
        {
          provide: Common.Provider,
          useValue: options,
        },
        {
          provide: Auth.TOKEN,
          useValue: authOptions,
        },
        AuthService,
      ],
    };
  }
}
