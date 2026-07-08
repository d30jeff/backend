import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';

export const PlanSelect = {
  ID: true,
  code: true,
  createdAt: true,
  name: true,
  updatedAt: true,
} satisfies Prisma.PlanSelect;

type WithSelectDefault<T = Partial<typeof PlanSelect>> = T;

type WithReturnType<S extends Prisma.PlanSelect> = Prisma.PlanGetPayload<{ select: S }>;

export type PlanFields = Prisma.PlanGetPayload<{
  select: typeof PlanSelect
}>;

@Injectable()
export class PlanRepository {
  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.PlanAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.plan.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.PlanUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.PlanCreateInput>;
      update?: WithOptionalID<Prisma.PlanUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.plan.upsert({
      ...params,
      select: params.select || PlanSelect,
    } as Prisma.PlanUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.PlanCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.PlanCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.PlanGetPayload<{ select: S }>> {
    return connection.plan.create({
      ...params,
       select: params.select || PlanSelect,
    } as Prisma.PlanCreateArgs) as unknown as Promise<Prisma.PlanGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.PlanCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.PlanCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.plan.createMany({ ...params } as Prisma.PlanCreateManyArgs) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.PlanFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.plan.findFirst({
      ...params,
      select: params.select || PlanSelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.PlanFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.plan.findMany({
      ...params,
      select: params.select || PlanSelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.PlanCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.plan.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.PlanUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.PlanUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.plan.update({
      ...params,
      select: params.select || PlanSelect,
      } as Prisma.PlanUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.PlanUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.PlanCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.plan.updateMany(
      { ...params } as Prisma.PlanUpdateManyArgs,
    ) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.PlanDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.plan.delete(params);
  }

  deleteMany(
    params: Prisma.PlanDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.plan.deleteMany(params);
  }
}
