import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { ModuleSelect } from '@libs/repositories/module.repository';
import { RoleSelect } from '@libs/repositories/role.repository';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';

export const UserRoleSelect = {
  ID: true,
  Module: { select: ModuleSelect },
  Role: { select: RoleSelect },
  createdAt: true,
} satisfies Prisma.UserRoleSelect;

type WithSelectDefault<T = Partial<typeof UserRoleSelect>> = T;

type WithReturnType<S extends Prisma.UserRoleSelect> = Prisma.UserRoleGetPayload<{ select: S }>;

export type UserRoleFields = Prisma.UserRoleGetPayload<{
  select: typeof UserRoleSelect
}>;

@Injectable()
export class UserRoleRepository {
  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.UserRoleAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.userRole.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.UserRoleUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.UserRoleCreateInput>;
      update?: WithOptionalID<Prisma.UserRoleUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.userRole.upsert({
      ...params,
      select: params.select || UserRoleSelect,
    } as Prisma.UserRoleUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.UserRoleCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.UserRoleCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.UserRoleGetPayload<{ select: S }>> {
    return connection.userRole.create({
      ...params,
      select: params.select || UserRoleSelect,
    } as Prisma.UserRoleCreateArgs) as unknown as Promise<Prisma.UserRoleGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.UserRoleCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.UserRoleCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.userRole.createMany({ ...params } as Prisma.UserRoleCreateManyArgs) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.UserRoleFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.userRole.findFirst({
      ...params,
      select: params.select || UserRoleSelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.UserRoleFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.userRole.findMany({
      ...params,
      select: params.select || UserRoleSelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.UserRoleCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.userRole.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.UserRoleUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.UserRoleUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.userRole.update({
      ...params,
      select: params.select || UserRoleSelect,
    } as Prisma.UserRoleUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.UserRoleUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.UserRoleCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.userRole.updateMany(
      { ...params } as Prisma.UserRoleUpdateManyArgs,
    ) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.UserRoleDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.userRole.delete(params);
  }

  deleteMany(
    params: Prisma.UserRoleDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.userRole.deleteMany(params);
  }
}
