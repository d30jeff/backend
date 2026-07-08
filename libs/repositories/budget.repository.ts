import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { UserSelect } from '@libs/repositories/user.repository';
import { WorkspaceSelect } from '@libs/repositories/workspace.repository';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';

export const BudgetSelect = {
  CreatedBy: { select: UserSelect },
  ID: true,
  Workspace: { select: WorkspaceSelect },
  amount: true,
  createdAt: true,
  deletedAt: true,
  endsAt: true,
  name: true,
  startsAt: true,
  updatedAt: true,
} satisfies Prisma.BudgetSelect;

type WithSelectDefault<T = Partial<typeof BudgetSelect>> = T;

type WithReturnType<S extends Prisma.BudgetSelect> = Prisma.BudgetGetPayload<{ select: S }>;

export type BudgetFields = Prisma.BudgetGetPayload<{
  select: typeof BudgetSelect
}>;

@Injectable()
export class BudgetRepository {

  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.BudgetAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.budget.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.BudgetUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.BudgetCreateInput>;
      update?: WithOptionalID<Prisma.BudgetUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.budget.upsert({
      ...params,
      select: params.select || BudgetSelect,
    } as Prisma.BudgetUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.BudgetCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.BudgetCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.BudgetGetPayload<{ select: S }>> {
    return connection.budget.create({
      ...params,
      select: params.select || BudgetSelect,
    } as Prisma.BudgetCreateArgs) as unknown as Promise<Prisma.BudgetGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.BudgetCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.BudgetCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.budget.createMany({ ...params } as Prisma.BudgetCreateManyArgs) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.BudgetFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.budget.findFirst({
      ...params,
      select: params.select || BudgetSelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.BudgetFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.budget.findMany({
      ...params,
      select: params.select || BudgetSelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.BudgetCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.budget.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.BudgetUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.BudgetUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.budget.update({
      ...params,
      select: params.select || BudgetSelect,
    } as Prisma.BudgetUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.BudgetUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.BudgetCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.budget.updateMany(
      { ...params } as Prisma.BudgetUpdateManyArgs,
    ) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.BudgetDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.budget.delete(params);
  }

  deleteMany(
    params: Prisma.BudgetDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.budget.deleteMany(params);
  }
}
