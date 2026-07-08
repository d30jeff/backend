import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { RoleSelect } from '@libs/repositories/role.repository';
import { UserSelect } from '@libs/repositories/user.repository';
import { WorkspaceSelect } from '@libs/repositories/workspace.repository';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';

export const WorkspaceMemberSelect = {
  ID: true,
  Role: { select: RoleSelect },
  User: { select: UserSelect },
  Workspace: { select: WorkspaceSelect },
  createdAt: true,
} satisfies Prisma.WorkspaceMemberSelect;

type WithSelectDefault<T = Partial<typeof WorkspaceMemberSelect>> = T;

type WithReturnType<S extends Prisma.WorkspaceMemberSelect> = Prisma.WorkspaceMemberGetPayload<{ select: S }>;

export type WorkspaceMemberFields = Prisma.WorkspaceMemberGetPayload<{
  select: typeof WorkspaceMemberSelect
}>;

@Injectable()
export class WorkspaceMemberRepository {
  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.WorkspaceMemberAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.workspaceMember.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.WorkspaceMemberUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.WorkspaceMemberCreateInput>;
      update?: WithOptionalID<Prisma.WorkspaceMemberUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.workspaceMember.upsert({
      ...params,
      select: params.select || WorkspaceMemberSelect,
    } as Prisma.WorkspaceMemberUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.WorkspaceMemberCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.WorkspaceMemberCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.WorkspaceMemberGetPayload<{ select: S }>> {
    return connection.workspaceMember.create({
      ...params,
       select: params.select || WorkspaceMemberSelect,
    } as Prisma.WorkspaceMemberCreateArgs) as unknown as Promise<Prisma.WorkspaceMemberGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.WorkspaceMemberCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.WorkspaceMemberCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.workspaceMember.createMany(
      { ...params } as Prisma.WorkspaceMemberCreateManyArgs,
    ) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.WorkspaceMemberFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.workspaceMember.findFirst({
      ...params,
      select: params.select || WorkspaceMemberSelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.WorkspaceMemberFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.workspaceMember.findMany({
      ...params,
      select: params.select || WorkspaceMemberSelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.WorkspaceMemberCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.workspaceMember.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.WorkspaceMemberUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.WorkspaceMemberUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.workspaceMember.update({
      ...params,
      select: params.select || WorkspaceMemberSelect,
      } as Prisma.WorkspaceMemberUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.WorkspaceMemberUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.WorkspaceMemberCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.workspaceMember.updateMany(
      { ...params } as Prisma.WorkspaceMemberUpdateManyArgs,
    ) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.WorkspaceMemberDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.workspaceMember.delete(params);
  }

  deleteMany(
    params: Prisma.WorkspaceMemberDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.workspaceMember.deleteMany(params);
  }
}
