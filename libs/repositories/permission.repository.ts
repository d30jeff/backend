import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { ActionSelect } from '@libs/repositories/action.repository';
import { FeatureSelect } from '@libs/repositories/feature.repository';
import { ModuleSelect } from '@libs/repositories/module.repository';
import { RoleSelect } from '@libs/repositories/role.repository';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';

export const PermissionSelect = {
  Action: { select: ActionSelect },
  Feature: { select: FeatureSelect },
  ID: true,
  Module: { select: ModuleSelect },
  Role: { select: RoleSelect },
  createdAt: true,
  scope: true,
  updatedAt: true,
} satisfies Prisma.PermissionSelect;

type WithSelectDefault<T = Partial<typeof PermissionSelect>> = T;

type WithReturnType<S extends Prisma.PermissionSelect> = Prisma.PermissionGetPayload<{ select: S }>;

export type PermissionFields = Prisma.PermissionGetPayload<{
  select: typeof PermissionSelect
}>;

@Injectable()
export class PermissionRepository {
  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.PermissionAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.permission.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.PermissionUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.PermissionCreateInput>;
      update?: WithOptionalID<Prisma.PermissionUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.permission.upsert({
      ...params,
      select: params.select || PermissionSelect,
    } as Prisma.PermissionUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.PermissionCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.PermissionCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.PermissionGetPayload<{ select: S }>> {
    return connection.permission.create({
      ...params,
       select: params.select || PermissionSelect,
    } as Prisma.PermissionCreateArgs) as unknown as Promise<Prisma.PermissionGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.PermissionCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.PermissionCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.permission.createMany({ ...params } as Prisma.PermissionCreateManyArgs) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.PermissionFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.permission.findFirst({
      ...params,
      select: params.select || PermissionSelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.PermissionFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.permission.findMany({
      ...params,
      select: params.select || PermissionSelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.PermissionCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.permission.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.PermissionUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.PermissionUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.permission.update({
      ...params,
      select: params.select || PermissionSelect,
      } as Prisma.PermissionUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.PermissionUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.PermissionCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.permission.updateMany(
      { ...params } as Prisma.PermissionUpdateManyArgs,
    ) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.PermissionDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.permission.delete(params);
  }

  deleteMany(
    params: Prisma.PermissionDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.permission.deleteMany(params);
  }
}
