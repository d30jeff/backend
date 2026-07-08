import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { CategoryTypeSelect } from '@libs/repositories/category-type.repository';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';

export const CategorySelect = {
  CategoryType: { select: CategoryTypeSelect },
  ID: true,
  code: true,
  createdAt: true,
  name: true,
  updatedAt: true,
} satisfies Prisma.CategorySelect;

type WithSelectDefault<T = Partial<typeof CategorySelect>> = T;

type WithReturnType<S extends Prisma.CategorySelect> = Prisma.CategoryGetPayload<{ select: S }>;

export type CategoryFields = Prisma.CategoryGetPayload<{
  select: typeof CategorySelect
}>;

@Injectable()
export class CategoryRepository {

  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.CategoryAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.category.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.CategoryUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.CategoryCreateInput>;
      update?: WithOptionalID<Prisma.CategoryUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.category.upsert({
      ...params,
      select: params.select || CategorySelect,
    } as Prisma.CategoryUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.CategoryCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.CategoryCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.CategoryGetPayload<{ select: S }>> {
    return connection.category.create({
      ...params,
      select: params.select || CategorySelect,
    } as Prisma.CategoryCreateArgs) as unknown as Promise<Prisma.CategoryGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.CategoryCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.CategoryCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.category.createMany({ ...params } as Prisma.CategoryCreateManyArgs) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.CategoryFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.category.findFirst({
      ...params,
      select: params.select || CategorySelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.CategoryFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.category.findMany({
      ...params,
      select: params.select || CategorySelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.CategoryCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.category.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.CategoryUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.CategoryUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.category.update({
      ...params,
      select: params.select || CategorySelect,
    } as Prisma.CategoryUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.CategoryUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.CategoryCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.category.updateMany(
      { ...params } as Prisma.CategoryUpdateManyArgs,
    ) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.CategoryDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.category.delete(params);
  }

  deleteMany(
    params: Prisma.CategoryDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.category.deleteMany(params);
  }
}
