import { DatabaseModule } from '@libs/providers/database/database.module';
import { ActionRepository } from '@libs/repositories/action.repository';
import { Module } from '@nestjs/common';

@Module({
  exports: [ActionRepository],
  imports: [DatabaseModule],
  providers: [ActionRepository],
})
export class ActionModule {}
