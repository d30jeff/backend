import { ConfigProvider } from '@libs/providers/config/config.provider';
import { DatabaseProvider } from '@libs/providers/database/database.provider';
import { UserRepository } from '@libs/repositories/user.repository';
import { Module } from '@nestjs/common';

@Module({
  exports: [DatabaseProvider, UserRepository],
  providers: [ConfigProvider, DatabaseProvider, UserRepository],
})
export class DatabaseModule { }
