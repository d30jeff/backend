import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';

export const IndustrySelect = {
  ID: true,
  code: true,
  createdAt: true,
  name: true,
  updatedAt: true,
} satisfies Prisma.IndustrySelect;

type WithSelectDefault<T = Partial<typeof IndustrySelect>> = T;

type WithReturnType<S extends Prisma.IndustrySelect> = Prisma.IndustryGetPayload<{ select: S }>;

export type IndustryFields = Prisma.IndustryGetPayload<{
  select: typeof IndustrySelect
}>;

@Injectable()
export class IndustryRepository {
  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.IndustryAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.industry.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.IndustryUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.IndustryCreateInput>;
      update?: WithOptionalID<Prisma.IndustryUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.industry.upsert({
      ...params,
      select: params.select || IndustrySelect,
    } as Prisma.IndustryUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.IndustryCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.IndustryCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.IndustryGetPayload<{ select: S }>> {
    return connection.industry.create({
      ...params,
       select: params.select || IndustrySelect,
    } as Prisma.IndustryCreateArgs) as unknown as Promise<Prisma.IndustryGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.IndustryCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.IndustryCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.industry.createMany({ ...params } as Prisma.IndustryCreateManyArgs) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.IndustryFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.industry.findFirst({
      ...params,
      select: params.select || IndustrySelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.IndustryFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.industry.findMany({
      ...params,
      select: params.select || IndustrySelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.IndustryCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.industry.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.IndustryUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.IndustryUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.industry.update({
      ...params,
      select: params.select || IndustrySelect,
      } as Prisma.IndustryUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.IndustryUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.IndustryCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.industry.updateMany(
      { ...params } as Prisma.IndustryUpdateManyArgs,
    ) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.IndustryDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.industry.delete(params);
  }

  deleteMany(
    params: Prisma.IndustryDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.industry.deleteMany(params);
  }
}
