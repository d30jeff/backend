import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { AccountSelect } from '@libs/repositories/account.repository';
import { UploadSelect } from '@libs/repositories/upload.repository';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';

export const TransactionSelect = {
  Account: { select: AccountSelect },
  Attachments: { select: { Upload: { select: UploadSelect } } },
  ID: true,
  amount: true,
  createdAt: true,
  date: true,
  description: true,
  updatedAt: true,
} satisfies Prisma.TransactionSelect;

type WithSelectDefault<T = Partial<typeof TransactionSelect>> = T;

type WithReturnType<S extends Prisma.TransactionSelect> = Prisma.TransactionGetPayload<{ select: S }>;

export type TransactionFields = Prisma.TransactionGetPayload<{
  select: typeof TransactionSelect
}>;

@Injectable()
export class TransactionRepository {
  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.TransactionAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.transaction.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.TransactionUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.TransactionCreateInput>;
      update?: WithOptionalID<Prisma.TransactionUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.transaction.upsert({
      ...params,
      select: params.select || TransactionSelect,
    } as Prisma.TransactionUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.TransactionCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.TransactionCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.TransactionGetPayload<{ select: S }>> {
    return connection.transaction.create({
      ...params,
       select: params.select || TransactionSelect,
    } as Prisma.TransactionCreateArgs) as unknown as Promise<Prisma.TransactionGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.TransactionCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.TransactionCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.transaction.createMany({ ...params } as Prisma.TransactionCreateManyArgs) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.TransactionFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.transaction.findFirst({
      ...params,
      select: params.select || TransactionSelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.TransactionFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.transaction.findMany({
      ...params,
      select: params.select || TransactionSelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.TransactionCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.transaction.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.TransactionUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.TransactionUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.transaction.update({
      ...params,
      select: params.select || TransactionSelect,
      } as Prisma.TransactionUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.TransactionUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.TransactionCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.transaction.updateMany(
      { ...params } as Prisma.TransactionUpdateManyArgs,
    ) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.TransactionDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.transaction.delete(params);
  }

  deleteMany(
    params: Prisma.TransactionDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.transaction.deleteMany(params);
  }
}
