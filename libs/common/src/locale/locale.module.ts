import { DatabaseModule } from '@libs/providers/database/database.module';
import { LocaleRepository } from '@libs/repositories/locale.repository';
import { RedisModule } from '@libs/services/redis/redis.module';
import { Module, OnModuleInit } from '@nestjs/common';

import { LocaleController } from './locale.controller';
import { LocaleService } from './locale.service';

@Module({
  controllers: [LocaleController],
  imports: [RedisModule, DatabaseModule],
  providers: [LocaleRepository, LocaleService],
})
export class LocaleModule implements OnModuleInit {
  constructor(private readonly localeService: LocaleService) {}

  async onModuleInit() {
    await this.localeService.populate();
  }
}
