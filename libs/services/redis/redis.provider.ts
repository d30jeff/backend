import { Config } from '@libs/providers/config/config.interface';
import { Redis } from '@libs/services/redis/redis.interface';
import { Provider } from '@nestjs/common';
import { Redis as IoRedis } from 'ioredis';

export const RedisProvider: Provider = {
  inject: [Config.TOKEN],
  provide: Redis.TOKEN,
  useFactory: (config: Config.Provider): Redis.Provider => {
    return new IoRedis(config.REDIS_URL, { maxRetriesPerRequest: null });
  },
};
