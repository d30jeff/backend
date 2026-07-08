import { Prisma, PrismaClient } from '@libs/prisma/client';
import { Config } from '@libs/providers/config/config.interface';
import { Database } from '@libs/providers/database/database.interface';
import { generateID } from '@libs/providers/nanoid.provider';
import { StringUtil } from '@libs/utils/string.util';
import { Logger, Provider } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';

export const DatabaseProvider: Provider = {
  inject: [Config.TOKEN],
  provide: Database.TOKEN,
  useFactory: async (config: Config.Provider): Promise<Database.Provider> => {
    const logger = new Logger('Database Provider');

    const log: (Prisma.LogLevel | Prisma.LogDefinition)[] = [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'event',
        level: 'error',
      },
      {
        emit: 'event',
        level: 'info',
      },
      {
        emit: 'event',
        level: 'warn',
      },
    ];

    const prismaWriteConnection: PrismaClient<'query'> = new PrismaClient({
      adapter: new PrismaPg({ connectionString: config.DATABASE_URL }),
      log,
    });

    const prismaReadConnection: PrismaClient<'query'> = new PrismaClient({
      adapter: new PrismaPg({ connectionString: config.DATABASE_READ_REPLICA_URL }),
      log,
    });

    const displayLog = (event: Prisma.QueryEvent) => {
      const {
        query, params, duration,
      } = event;
      if (config.isTest) {
        return;
      }

      console.info({
        duration: `${duration}ms`,
        params,
        query,
      });
    };

    if (process.env.NODE_ENV === 'development') {
      prismaWriteConnection.$on('query', displayLog);
      prismaReadConnection.$on('query', displayLog);
    }

    const generateIDExtension = Prisma.defineExtension({
      name: 'generateID',
      query: {
        $allModels: {
          create: async ({
            model, args, query,
          }) => {
            if (args.data && !args.data['ID']) {
              args.data['ID'] = generateID(
                StringUtil.SnakeCase(model),
              );
            }
            return query(args);
          },

          async createMany({
            model, args, query,
          }) {
            if (args.data && Array.isArray(args.data)) {
              for (const item of args.data) {
                if (!item['ID']) {
                  item['ID'] = generateID(
                    StringUtil.SnakeCase(model),
                  );
                }
              }
            }
            return query(args);
          },

          async upsert({
            model, args, query,
          }) {
            if (args.create && !args.create['ID']) {
              args.create['ID'] = generateID(
                StringUtil.SnakeCase(model),
              );
            }
            return query(args);
          },
        },
      },
    });
    const extendedReadConnection = prismaReadConnection.$extends(
      generateIDExtension,
    ) as PrismaClient<'query'>;
    const extendedWriteConnection = prismaWriteConnection.$extends(
      generateIDExtension,
    ) as PrismaClient<'query'>;

    return {
      read: extendedReadConnection,
      write: extendedWriteConnection,
    };
  },
};
