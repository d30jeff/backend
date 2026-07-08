import { Redis } from '@libs/services/redis/redis.interface';
import {
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Redis as IoRedis } from 'ioredis';

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);

  constructor(@Inject(Redis.TOKEN) private redis: IoRedis) { }

  set(params: Redis.CreateParams) {
    this.logger.log('Setting', params);
    const {
      type,
      ID,
      value,
      ttlInSeconds: ttl = 60,
    } = params;
    const key = `${type.toString().trim()}:${ID.trim()}`;

    if (ttl) {
      return this.redis.set(key, JSON.stringify(value), 'EX', ttl);
    }

    return this.redis.set(key, JSON.stringify(value));
  }

  setex(params: Redis.CreateParams) {
    const {
      type,
      ID,
      value,
      ttlInSeconds: ttl = 60,
    } = params;
    const key = `${type.toString().trim()}:${ID.trim()}`;
    return this.redis.setex(key, ttl, JSON.stringify(value));
  }

  async get(params: Redis.FindParams) {
    const {
      type, ID,
    } = params;
    const key = `${type.toString().trim()}:${ID.trim()}`;
    this.logger.log(`Retrieving key: ${key}`);
    const value = await this.redis.get(key);

    if (!value) {
      return null;
    }

    return JSON.parse(value!);
  }

  async getTTL(params: Redis.GetTTLParams) {
    const {
      type, ID,
    } = params;
    const key = `${type.toString().trim()}:${ID.trim()}`;
    return this.redis.ttl(key);
  }

  delete(params: Redis.DeleteParams) {
    const {
      type, ID,
    } = params;
    const key = `${type.toString().trim()}:${ID.trim()}`;
    return this.redis.del(key);
  }
}
