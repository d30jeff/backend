import { locales } from '@libs/common/src/locale/locale.data-source';
import { Locale } from '@libs/common/src/locale/locale.interface';
import { Prisma } from '@libs/prisma/client';
import { LocaleRepository } from '@libs/repositories/locale.repository';
import { Redis } from '@libs/services/redis/redis.interface';
import { RedisService } from '@libs/services/redis/redis.service';
import { dayjs } from '@libs/utils/dayjs.util';
import { Pagination } from '@libs/utils/pagination.util';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LocaleService {
  private readonly logger = new Logger(LocaleService.name);
  constructor(
    private readonly localeRepository: LocaleRepository,
    private readonly redisService: RedisService,
  ) {}

  async populate() {
    await this.redisService.delete({
      ID: Redis.Keys.LocaleCache,
      type: Redis.Keys.LocaleCache,
    });

    await this.localeRepository.createMany({
      data: locales.map((locale) => {
        return {
          code: locale.code,
          isActive: locale.isActive,
          name: locale.name,
        };
      }),
      skipDuplicates: true,
    });

    await this.redisService.set({
      ID: Redis.Keys.LocaleCache,
      ttlInSeconds: dayjs.duration(1, 'hour').asSeconds(),
      type: Redis.Keys.LocaleCache,
      value: dayjs().toISOString(),
    });
  }

  async list(params: Locale.List.Params) {
    const {
      page,
      limit,
      keywords,
    } = params;

    const AND: Prisma.Enumerable<Prisma.LocaleWhereInput> = [];
    let where: Prisma.LocaleWhereInput = {};
    where = {
      ...where,
      AND,
    };

    if (keywords) {
      AND.push({
        name: {
          contains: keywords,
          mode: 'insensitive',
        },
      });
    }

    const total = await this.localeRepository.count({ where });
    const items = await this.localeRepository.findMany({
      orderBy: { name: 'asc' },
      skip: (page - 1) * limit,
      take: limit,
      where,
    });

    return {
      items,
      pagination: new Pagination({
        limit,
        page,
        total,
      }),
    };
  }
}
