import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';

export const CountrySelect = {
  ID: true,
  code: true,
  createdAt: true,
  isActive: true,
  name: true,
  updatedAt: true,
} satisfies Prisma.CountrySelect;

type WithSelectDefault<T = Partial<typeof CountrySelect>> = T;

type WithReturnType<S extends Prisma.CountrySelect> = Prisma.CountryGetPayload<{ select: S }>;

export type CountryFields = Prisma.CountryGetPayload<{
  select: typeof CountrySelect
}>;

@Injectable()
export class CountryRepository {
  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.CountryAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.country.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.CountryUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.CountryCreateInput>;
      update?: WithOptionalID<Prisma.CountryUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.country.upsert({
      ...params,
      select: params.select || CountrySelect,
    } as Prisma.CountryUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.CountryCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.CountryCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.CountryGetPayload<{ select: S }>> {
    return connection.country.create({
      ...params,
       select: params.select || CountrySelect,
    } as Prisma.CountryCreateArgs) as unknown as Promise<Prisma.CountryGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.CountryCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.CountryCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.country.createMany({ ...params } as Prisma.CountryCreateManyArgs) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.CountryFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.country.findFirst({
      ...params,
      select: params.select || CountrySelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.CountryFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.country.findMany({
      ...params,
      select: params.select || CountrySelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.CountryCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.country.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.CountryUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.CountryUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.country.update({
      ...params,
      select: params.select || CountrySelect,
      } as Prisma.CountryUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.CountryUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.CountryCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.country.updateMany(
      { ...params } as Prisma.CountryUpdateManyArgs,
    ) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.CountryDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.country.delete(params);
  }

  deleteMany(
    params: Prisma.CountryDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.country.deleteMany(params);
  }
}
