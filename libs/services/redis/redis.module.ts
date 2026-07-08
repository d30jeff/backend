import { ConfigProvider } from '@libs/providers/config/config.provider';
import { RedisProvider } from '@libs/services/redis/redis.provider';
import { RedisService } from '@libs/services/redis/redis.service';
import { Module } from '@nestjs/common';

@Module({
  exports: [RedisProvider, RedisService],
  providers: [ConfigProvider, RedisProvider, RedisService],
})
export class RedisModule { }
