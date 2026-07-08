import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { CountrySelect } from '@libs/repositories/country.repository';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';

export const CurrencySelect = {
  Country: { select: CountrySelect },
  ID: true,
  code: true,
  createdAt: true,
  deletedAt: true,
  name: true,
  updatedAt: true,
} satisfies Prisma.CurrencySelect;

type WithSelectDefault<T = Partial<typeof CurrencySelect>> = T;

type WithReturnType<S extends Prisma.CurrencySelect> = Prisma.CurrencyGetPayload<{ select: S }>;

export type CurrencyFields = Prisma.CurrencyGetPayload<{
  select: typeof CurrencySelect
}>;

@Injectable()
export class CurrencyRepository {
  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.CurrencyAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.currency.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.CurrencyUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.CurrencyCreateInput>;
      update?: WithOptionalID<Prisma.CurrencyUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.currency.upsert({
      ...params,
      select: params.select || CurrencySelect,
    } as Prisma.CurrencyUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.CurrencyCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.CurrencyCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.CurrencyGetPayload<{ select: S }>> {
    return connection.currency.create({
      ...params,
       select: params.select || CurrencySelect,
    } as Prisma.CurrencyCreateArgs) as unknown as Promise<Prisma.CurrencyGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.CurrencyCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.CurrencyCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.currency.createMany({ ...params } as Prisma.CurrencyCreateManyArgs) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.CurrencyFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.currency.findFirst({
      ...params,
      select: params.select || CurrencySelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.CurrencyFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.currency.findMany({
      ...params,
      select: params.select || CurrencySelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.CurrencyCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.currency.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.CurrencyUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.CurrencyUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.currency.update({
      ...params,
      select: params.select || CurrencySelect,
      } as Prisma.CurrencyUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.CurrencyUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.CurrencyCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.currency.updateMany(
      { ...params } as Prisma.CurrencyUpdateManyArgs,
    ) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.CurrencyDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.currency.delete(params);
  }

  deleteMany(
    params: Prisma.CurrencyDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.currency.deleteMany(params);
  }
}
