import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';
import { DefaultArgs } from '@prisma/client/runtime/client';

export const ActionSelect = {
  ID: true,
  code: true,
  createdAt: true,
  name: true,
  updatedAt: true,
} satisfies Prisma.ActionSelect;

type WithSelectDefault<T = Partial<typeof ActionSelect>> = T;

type WithReturnType<S extends Prisma.ActionSelect<DefaultArgs>> = Prisma.ActionGetPayload<{ select: S }>;

export type ActionFields = Prisma.ActionGetPayload<{
  select: typeof ActionSelect
}>;

@Injectable()
export class ActionRepository {

  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.ActionAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.action.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.ActionUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.ActionCreateInput>;
      update?: WithOptionalID<Prisma.ActionUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.action.upsert({
      ...params,
      select: params.select || ActionSelect,
    } as Prisma.ActionUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.ActionCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.ActionCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.ActionGetPayload<{ select: S }>> {
    return connection.action.create({
      ...params,
      select: params.select || ActionSelect,
    } as Prisma.ActionCreateArgs) as unknown as Promise<Prisma.ActionGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.ActionCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.ActionCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.action.createMany({ ...params } as Prisma.ActionCreateManyArgs) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.ActionFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.action.findFirst({
      ...params,
      select: params.select || ActionSelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.ActionFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.action.findMany({
      ...params,
      select: params.select || ActionSelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.ActionCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.action.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.ActionUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.ActionUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.action.update({
      ...params,
      select: params.select || ActionSelect,
    } as Prisma.ActionUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.ActionUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.ActionCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.action.updateMany(
      { ...params } as Prisma.ActionUpdateManyArgs,
    ) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.ActionDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.action.delete(params);
  }

  deleteMany(
    params: Prisma.ActionDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.action.deleteMany(params);
  }
}
