import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';

export const CitySelect = {
  ID: true,
  code: true,
  createdAt: true,
  name: true,
  updatedAt: true,
} satisfies Prisma.CitySelect;

type WithSelectDefault<T = Partial<typeof CitySelect>> = T;

type WithReturnType<S extends Prisma.CitySelect> = Prisma.CityGetPayload<{ select: S }>;

export type CityFields = Prisma.CityGetPayload<{
  select: typeof CitySelect
}>;

@Injectable()
export class CityRepository {
  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.CityAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.city.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.CityUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.CityCreateInput>;
      update?: WithOptionalID<Prisma.CityUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.city.upsert({
      ...params,
      select: params.select || CitySelect,
    } as Prisma.CityUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.CityCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.CityCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.CityGetPayload<{ select: S }>> {
    return connection.city.create({
      ...params,
       select: params.select || CitySelect,
    } as Prisma.CityCreateArgs) as unknown as Promise<Prisma.CityGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.CityCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.CityCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.city.createMany({ ...params } as Prisma.CityCreateManyArgs) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.CityFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.city.findFirst({
      ...params,
      select: params.select || CitySelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.CityFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.city.findMany({
      ...params,
      select: params.select || CitySelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.CityCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.city.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.CityUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.CityUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.city.update({
      ...params,
      select: params.select || CitySelect,
      } as Prisma.CityUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.CityUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.CityCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.city.updateMany(
      { ...params } as Prisma.CityUpdateManyArgs,
    ) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.CityDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.city.delete(params);
  }

  deleteMany(
    params: Prisma.CityDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.city.deleteMany(params);
  }
}
