import { DatabaseModule } from '@libs/providers/database/database.module';
import { RoleRepository } from '@libs/repositories/role.repository';
import { Module } from '@nestjs/common';

import { RoleService } from './role.service';

@Module({
  exports: [RoleRepository, RoleService],
  imports: [
    DatabaseModule,
  ],
  providers: [RoleRepository, RoleService],
})
export class RoleModule {}
