import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';

export const ModuleSelect = {
  ID: true,
  code: true,
  createdAt: true,
  name: true,
  updatedAt: true,
} satisfies Prisma.ModuleSelect;

type WithSelectDefault<T = Partial<typeof ModuleSelect>> = T;

type WithReturnType<S extends Prisma.ModuleSelect> = Prisma.ModuleGetPayload<{ select: S }>;

export type ModuleFields = Prisma.ModuleGetPayload<{
  select: typeof ModuleSelect
}>;

@Injectable()
export class ModuleRepository {
  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.ModuleAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.module.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.ModuleUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.ModuleCreateInput>;
      update?: WithOptionalID<Prisma.ModuleUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.module.upsert({
      ...params,
      select: params.select || ModuleSelect,
    } as Prisma.ModuleUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.ModuleCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.ModuleCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.ModuleGetPayload<{ select: S }>> {
    return connection.module.create({
      ...params,
      select: params.select || ModuleSelect,
    } as Prisma.ModuleCreateArgs) as unknown as Promise<Prisma.ModuleGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.ModuleCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.ModuleCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.module.createMany({ ...params } as Prisma.ModuleCreateManyArgs) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.ModuleFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.module.findFirst({
      ...params,
      select: params.select || ModuleSelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.ModuleFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.module.findMany({
      ...params,
      select: params.select || ModuleSelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.ModuleCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.module.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.ModuleUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.ModuleUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.module.update({
      ...params,
      select: params.select || ModuleSelect,
    } as Prisma.ModuleUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.ModuleUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.ModuleCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.module.updateMany(
      { ...params } as Prisma.ModuleUpdateManyArgs,
    ) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.ModuleDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.module.delete(params);
  }

  deleteMany(
    params: Prisma.ModuleDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.module.deleteMany(params);
  }
}
