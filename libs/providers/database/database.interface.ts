import { PrismaClient } from '@libs/prisma/client';

export namespace Database {
  export const TOKEN = 'DATABASE_PROVIDER_TOKEN';
  export type Provider = {
    read: PrismaClient<'query'>;
    write: PrismaClient<'query'>;
  };
}
