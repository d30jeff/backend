import { PermissionModule } from '@libs/common/src/permission/permission.module';
import { DatabaseModule } from '@libs/providers/database/database.module';
import { ModuleRepository } from '@libs/repositories/module.repository';
import {
  forwardRef,
  Module,
  OnModuleInit,
} from '@nestjs/common';

import { ModuleService } from './module.service';

@Module({
  exports: [ModuleRepository, ModuleService],
  imports: [
    DatabaseModule,
    forwardRef(() => PermissionModule),
  ],
  providers: [ModuleRepository, ModuleService],
})
export class ModuleModule implements OnModuleInit {
  constructor(private readonly moduleService: ModuleService) {}

  async onModuleInit() {
    await this.moduleService.populate();
  }
}
