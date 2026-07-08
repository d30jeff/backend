import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';

export const RoleSelect = {
  ID: true,
  code: true,
  createdAt: true,
  name: true,
  updatedAt: true,
} satisfies Prisma.RoleSelect;

type WithSelectDefault<T = Partial<typeof RoleSelect>> = T;

type WithReturnType<S extends Prisma.RoleSelect> = Prisma.RoleGetPayload<{ select: S }>;

export type RoleFields = Prisma.RoleGetPayload<{
  select: typeof RoleSelect
}>;

@Injectable()
export class RoleRepository {
  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.RoleAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.role.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.RoleUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.RoleCreateInput>;
      update?: WithOptionalID<Prisma.RoleUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.role.upsert({
      ...params,
      select: params.select || RoleSelect,
    } as Prisma.RoleUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.RoleCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.RoleCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.RoleGetPayload<{ select: S }>> {
    return connection.role.create({
      ...params,
       select: params.select || RoleSelect,
    } as Prisma.RoleCreateArgs) as unknown as Promise<Prisma.RoleGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.RoleCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.RoleCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.role.createMany({ ...params } as Prisma.RoleCreateManyArgs) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.RoleFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.role.findFirst({
      ...params,
      select: params.select || RoleSelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.RoleFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.role.findMany({
      ...params,
      select: params.select || RoleSelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.RoleCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.role.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.RoleUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.RoleUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.role.update({
      ...params,
      select: params.select || RoleSelect,
      } as Prisma.RoleUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.RoleUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.RoleCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.role.updateMany(
      { ...params } as Prisma.RoleUpdateManyArgs,
) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.RoleDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.role.delete(params);
  }

  deleteMany(
    params: Prisma.RoleDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.role.deleteMany(params);
  }
}
