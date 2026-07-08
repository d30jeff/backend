import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';

export const LocaleSelect = {
  ID: true,
  code: true,
  createdAt: true,
  isActive: true,
  name: true,
  updatedAt: true,
} satisfies Prisma.LocaleSelect;

type WithSelectDefault<T = Partial<typeof LocaleSelect>> = T;

type WithReturnType<S extends Prisma.LocaleSelect> = Prisma.LocaleGetPayload<{ select: S }>;

export type LocaleFields = Prisma.LocaleGetPayload<{
  select: typeof LocaleSelect
}>;

@Injectable()
export class LocaleRepository {
  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.LocaleAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.locale.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.LocaleUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.LocaleCreateInput>;
      update?: WithOptionalID<Prisma.LocaleUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.locale.upsert({
      ...params,
      select: params.select || LocaleSelect,
    } as Prisma.LocaleUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.LocaleCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.LocaleCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.LocaleGetPayload<{ select: S }>> {
    return connection.locale.create({
      ...params,
       select: params.select || LocaleSelect,
    } as Prisma.LocaleCreateArgs) as unknown as Promise<Prisma.LocaleGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.LocaleCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.LocaleCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.locale.createMany({ ...params } as Prisma.LocaleCreateManyArgs) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.LocaleFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.locale.findFirst({
      ...params,
      select: params.select || LocaleSelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.LocaleFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.locale.findMany({
      ...params,
      select: params.select || LocaleSelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.LocaleCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.locale.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.LocaleUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.LocaleUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.locale.update({
      ...params,
      select: params.select || LocaleSelect,
      } as Prisma.LocaleUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.LocaleUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.LocaleCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.locale.updateMany(
      { ...params } as Prisma.LocaleUpdateManyArgs,
    ) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.LocaleDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.locale.delete(params);
  }

  deleteMany(
    params: Prisma.LocaleDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.locale.deleteMany(params);
  }
}
