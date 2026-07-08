import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';

export const CategoryTypeSelect = {
  ID: true,
  code: true,
  createdAt: true,
  name: true,
  updatedAt: true,
} satisfies Prisma.CategoryTypeSelect;

type WithSelectDefault<T = Partial<typeof CategoryTypeSelect>> = T;

type WithReturnType<S extends Prisma.CategoryTypeSelect> = Prisma.CategoryTypeGetPayload<{ select: S }>;

export type CategoryTypeFields = Prisma.CategoryTypeGetPayload<{
  select: typeof CategoryTypeSelect
}>;

@Injectable()
export class CategoryTypeRepository {

  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.CategoryTypeAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.categoryType.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.CategoryTypeUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.CategoryTypeCreateInput>;
      update?: WithOptionalID<Prisma.CategoryTypeUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.categoryType.upsert({
      ...params,
      select: params.select || CategoryTypeSelect,
    } as Prisma.CategoryTypeUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.CategoryTypeCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.CategoryTypeCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.CategoryTypeGetPayload<{ select: S }>> {
    return connection.categoryType.create({
      ...params,
      select: params.select || CategoryTypeSelect,
    } as Prisma.CategoryTypeCreateArgs) as unknown as Promise<Prisma.CategoryTypeGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.CategoryTypeCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.CategoryTypeCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.categoryType.createMany({ ...params } as Prisma.CategoryTypeCreateManyArgs) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.CategoryTypeFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.categoryType.findFirst({
      ...params,
      select: params.select || CategoryTypeSelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.CategoryTypeFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.categoryType.findMany({
      ...params,
      select: params.select || CategoryTypeSelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.CategoryTypeCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.categoryType.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.CategoryTypeUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.CategoryTypeUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.categoryType.update({
      ...params,
      select: params.select || CategoryTypeSelect,
    } as Prisma.CategoryTypeUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.CategoryTypeUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.CategoryTypeCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.categoryType.updateMany(
      { ...params } as Prisma.CategoryTypeUpdateManyArgs,
    ) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.CategoryTypeDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.categoryType.delete(params);
  }

  deleteMany(
    params: Prisma.CategoryTypeDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.categoryType.deleteMany(params);
  }
}
