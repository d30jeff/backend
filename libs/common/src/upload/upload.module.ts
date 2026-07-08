import { Auth } from '@libs/common/src/auth/auth.interface';
import { AuthService } from '@libs/common/src/auth/auth.service';
import { Common } from '@libs/common/src/common.interface';
import { UploadController } from '@libs/common/src/upload/upload.controller';
import { UploadService } from '@libs/common/src/upload/upload.service';
import { Config } from '@libs/providers/config/config.interface';
import { ConfigProvider } from '@libs/providers/config/config.provider';
import { Database } from '@libs/providers/database/database.interface';
import { DatabaseModule } from '@libs/providers/database/database.module';
import { DatabaseProvider } from '@libs/providers/database/database.provider';
import { S3 } from '@libs/providers/s3/s3.interface';
import { S3Provider } from '@libs/providers/s3/s3.provider';
import { S3Service } from '@libs/providers/s3/s3.service';
import { UploadRepository } from '@libs/repositories/upload.repository';
import {
  DynamicModule,
  Module,
  OnModuleInit,
} from '@nestjs/common';

@Module({

})
export class UploadModule implements OnModuleInit {
  constructor(private readonly s3Service: S3Service) {}

  static forRoot(options: Common.ModuleOptions): DynamicModule {
    return {
      controllers: [UploadController],
      imports: [DatabaseModule],
      module: UploadModule,
      providers: [
        {
          provide: Common.Provider,
          useValue: options,
        },
        S3Provider,
        ConfigProvider,
        UploadRepository,
        UploadService,
        S3Service,
      ],
    };
  }

  async onModuleInit() {
    await this.s3Service.initialize();
  }

}
