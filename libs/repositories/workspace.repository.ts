import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { ModuleSelect } from '@libs/repositories/module.repository';
import { RoleSelect } from '@libs/repositories/role.repository';
import { UserSelect } from '@libs/repositories/user.repository';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';

export const WorkspaceSelect = {
  CreatedBy: { select: UserSelect },
  ID: true,
  Members: { select: { Role: { select: RoleSelect } } },
  Module: { select: ModuleSelect },
  createdAt: true,
  isActive: true,
  name: true,
} satisfies Prisma.WorkspaceSelect;

type WithSelectDefault<T = Partial<typeof WorkspaceSelect>> = T;

type WithReturnType<S extends Prisma.WorkspaceSelect> = Prisma.WorkspaceGetPayload<{ select: S }>;

export type WorkspaceFields = Prisma.WorkspaceGetPayload<{
  select: typeof WorkspaceSelect
}>;

@Injectable()
export class WorkspaceRepository {
  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.WorkspaceAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.workspace.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.WorkspaceUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.WorkspaceCreateInput>;
      update?: WithOptionalID<Prisma.WorkspaceUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.workspace.upsert({
      ...params,
      select: params.select || WorkspaceSelect,
    } as Prisma.WorkspaceUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.WorkspaceCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.WorkspaceCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.WorkspaceGetPayload<{ select: S }>> {
    return connection.workspace.create({
      ...params,
       select: params.select || WorkspaceSelect,
    } as Prisma.WorkspaceCreateArgs) as unknown as Promise<Prisma.WorkspaceGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.WorkspaceCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.WorkspaceCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.workspace.createMany({ ...params } as Prisma.WorkspaceCreateManyArgs) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.WorkspaceFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.workspace.findFirst({
      ...params,
      select: params.select || WorkspaceSelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.WorkspaceFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.workspace.findMany({
      ...params,
      select: params.select || WorkspaceSelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.WorkspaceCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.workspace.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.WorkspaceUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.WorkspaceUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.workspace.update({
      ...params,
      select: params.select || WorkspaceSelect,
      } as Prisma.WorkspaceUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.WorkspaceUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.WorkspaceCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.workspace.updateMany(
      { ...params } as Prisma.WorkspaceUpdateManyArgs,
    ) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.WorkspaceDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.workspace.delete(params);
  }

  deleteMany(
    params: Prisma.WorkspaceDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.workspace.deleteMany(params);
  }
}
