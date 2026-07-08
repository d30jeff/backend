import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { CurrencySelect } from '@libs/repositories/currency.repository';
import { WorkspaceSelect } from '@libs/repositories/workspace.repository';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';
import { DefaultArgs } from '@prisma/client/runtime/client';

export const AccountSelect = {
  Currency: { select: CurrencySelect },
  ID: true,
  Workspace: { select: WorkspaceSelect },
  _count: { select: { Transactions: true } },
  balance: true,
  createdAt: true,
  description: true,
  excludeFromOverview: true,
  name: true,
  updatedAt: true,
} satisfies Prisma.AccountSelect;

type WithSelectDefault<T = Partial<typeof AccountSelect>> = T;

type WithReturnType<S extends Prisma.AccountSelect<DefaultArgs>> = Prisma.AccountGetPayload<{ select: S }>;

export type AccountFields = Prisma.AccountGetPayload<{
  select: typeof AccountSelect
}>;

@Injectable()
export class AccountRepository {
  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.AccountAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.account.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.AccountUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.AccountCreateInput>;
      update?: WithOptionalID<Prisma.AccountUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.account.upsert({
      ...params,
      select: params.select || AccountSelect,
    } as Prisma.AccountUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.AccountCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.AccountCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.AccountGetPayload<{ select: S }>> {
    return connection.account.create({
      ...params,
      select: params.select || AccountSelect,
    } as Prisma.AccountCreateArgs) as unknown as Promise<Prisma.AccountGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.AccountCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.AccountCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.account.createMany({ ...params } as Prisma.AccountCreateManyArgs) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.AccountFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.account.findFirst({
      ...params,
      select: params.select || AccountSelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.AccountFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.account.findMany({
      ...params,
      select: params.select || AccountSelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.AccountCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.account.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.AccountUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.AccountUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.account.update({
      ...params,
      select: params.select || AccountSelect,
    } as Prisma.AccountUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.AccountUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.AccountCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.account.updateMany(
      { ...params } as Prisma.AccountUpdateManyArgs,
    ) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.AccountDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.account.delete(params);
  }

  deleteMany(
    params: Prisma.AccountDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.account.deleteMany(params);
  }
}
