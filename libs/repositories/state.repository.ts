import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';

export const StateSelect = {
  ID: true,
  code: true,
  createdAt: true,
  name: true,
  updatedAt: true,
} satisfies Prisma.StateSelect;

type WithSelectDefault<T = Partial<typeof StateSelect>> = T;

type WithReturnType<S extends Prisma.StateSelect> = Prisma.StateGetPayload<{ select: S }>;

export type StateFields = Prisma.StateGetPayload<{
  select: typeof StateSelect
}>;

@Injectable()
export class StateRepository {
  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.StateAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.state.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.StateUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.StateCreateInput>;
      update?: WithOptionalID<Prisma.StateUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.state.upsert({
      ...params,
      select: params.select || StateSelect,
    } as Prisma.StateUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.StateCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.StateCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.StateGetPayload<{ select: S }>> {
    return connection.state.create({
      ...params,
       select: params.select || StateSelect,
    } as Prisma.StateCreateArgs) as unknown as Promise<Prisma.StateGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.StateCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.StateCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.state.createMany({ ...params } as Prisma.StateCreateManyArgs) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.StateFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.state.findFirst({
      ...params,
      select: params.select || StateSelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.StateFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.state.findMany({
      ...params,
      select: params.select || StateSelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.StateCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.state.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.StateUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.StateUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.state.update({
      ...params,
      select: params.select || StateSelect,
      } as Prisma.StateUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.StateUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.StateCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.state.updateMany(
      { ...params } as Prisma.StateUpdateManyArgs,
) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.StateDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.state.delete(params);
  }

  deleteMany(
    params: Prisma.StateDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.state.deleteMany(params);
  }
}
