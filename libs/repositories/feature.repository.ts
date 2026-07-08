import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';

export const FeatureSelect = {
  ID: true,
  code: true,
  createdAt: true,
  name: true,
  updatedAt: true,
} satisfies Prisma.FeatureSelect;

type WithSelectDefault<T = Partial<typeof FeatureSelect>> = T;

type WithReturnType<S extends Prisma.FeatureSelect> = Prisma.FeatureGetPayload<{ select: S }>;

export type FeatureFields = Prisma.FeatureGetPayload<{
  select: typeof FeatureSelect
}>;

@Injectable()
export class FeatureRepository {
  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.FeatureAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.feature.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.FeatureUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.FeatureCreateInput>;
      update?: WithOptionalID<Prisma.FeatureUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.feature.upsert({
      ...params,
      select: params.select || FeatureSelect,
    } as Prisma.FeatureUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.FeatureCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.FeatureCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.FeatureGetPayload<{ select: S }>> {
    return connection.feature.create({
      ...params,
       select: params.select || FeatureSelect,
    } as Prisma.FeatureCreateArgs) as unknown as Promise<Prisma.FeatureGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.FeatureCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.FeatureCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.feature.createMany({ ...params } as Prisma.FeatureCreateManyArgs) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.FeatureFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.feature.findFirst({
      ...params,
      select: params.select || FeatureSelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.FeatureFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.feature.findMany({
      ...params,
      select: params.select || FeatureSelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.FeatureCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.feature.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.FeatureUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.FeatureUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.feature.update({
      ...params,
      select: params.select || FeatureSelect,
      } as Prisma.FeatureUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.FeatureUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.FeatureCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.feature.updateMany(
      { ...params } as Prisma.FeatureUpdateManyArgs,
    ) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.FeatureDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.feature.delete(params);
  }

  deleteMany(
    params: Prisma.FeatureDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.feature.deleteMany(params);
  }
}
