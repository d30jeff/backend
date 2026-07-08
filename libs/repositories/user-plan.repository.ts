import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { PlanSelect } from '@libs/repositories/plan.repository';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';

export const UserPlanSelect = {
  ID: true,
  Plan: { select: PlanSelect },
  createdAt: true,
  expiresAt: true,
  updatedAt: true,
} satisfies Prisma.UserPlanSelect;

type WithSelectDefault<T = Partial<typeof UserPlanSelect>> = T;

type WithReturnType<S extends Prisma.UserPlanSelect> = Prisma.UserPlanGetPayload<{ select: S }>;

export type UserPlanFields = Prisma.UserPlanGetPayload<{
  select: typeof UserPlanSelect
}>;

@Injectable()
export class UserPlanRepository {
  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.UserPlanAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.userPlan.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.UserPlanUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.UserPlanCreateInput>;
      update?: WithOptionalID<Prisma.UserPlanUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.userPlan.upsert({
      ...params,
      select: params.select || UserPlanSelect,
    } as Prisma.UserPlanUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.UserPlanCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.UserPlanCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.UserPlanGetPayload<{ select: S }>> {
    return connection.userPlan.create({
      ...params,
       select: params.select || UserPlanSelect,
    } as Prisma.UserPlanCreateArgs) as unknown as Promise<Prisma.UserPlanGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.UserPlanCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.UserPlanCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.userPlan.createMany({ ...params } as Prisma.UserPlanCreateManyArgs) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.UserPlanFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.userPlan.findFirst({
      ...params,
      select: params.select || UserPlanSelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.UserPlanFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.userPlan.findMany({
      ...params,
      select: params.select || UserPlanSelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.UserPlanCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.userPlan.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.UserPlanUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.UserPlanUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.userPlan.update({
      ...params,
      select: params.select || UserPlanSelect,
      } as Prisma.UserPlanUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.UserPlanUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.UserPlanCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.userPlan.updateMany(
      { ...params } as Prisma.UserPlanUpdateManyArgs,
    ) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.UserPlanDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.userPlan.delete(params);
  }

  deleteMany(
    params: Prisma.UserPlanDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.userPlan.deleteMany(params);
  }
}
