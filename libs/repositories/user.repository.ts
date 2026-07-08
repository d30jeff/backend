import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { ModuleSelect } from '@libs/repositories/module.repository';
import { UserProfileSelect } from '@libs/repositories/user-profile.repository';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';

export const UserSelect = {
  ID: true,
  Module: { select: ModuleSelect },
  Profile: { select: UserProfileSelect },
  createdAt: true,
  email: true,
  phone: true,
  updatedAt: true,
  verifiedAt: true,
} satisfies Prisma.UserSelect;

type WithSelectDefault<T = Partial<typeof UserSelect>> = T;

type WithReturnType<S extends Prisma.UserSelect> = Prisma.UserGetPayload<{ select: S }>;

export type UserFields = Prisma.UserGetPayload<{
  select: typeof UserSelect
}>;

@Injectable()
export class UserRepository {
  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.UserAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.user.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.UserUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.UserCreateInput>;
      update?: WithOptionalID<Prisma.UserUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.user.upsert({
      ...params,
      select: params.select || UserSelect,
    } as Prisma.UserUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.UserCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.UserCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.UserGetPayload<{ select: S }>> {
    return connection.user.create({
      ...params,
      select: params.select || UserSelect,
    } as Prisma.UserCreateArgs) as unknown as Promise<Prisma.UserGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.UserCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.UserCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.user.createMany({ ...params } as Prisma.UserCreateManyArgs) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.UserFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.user.findFirst({
      ...params,
      select: params.select || UserSelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.UserFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.user.findMany({
      ...params,
      select: params.select || UserSelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.UserCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.user.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.UserUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.UserUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.user.update({
      ...params,
      select: params.select || UserSelect,
    } as Prisma.UserUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.UserUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.UserCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.user.updateMany(
      { ...params } as Prisma.UserUpdateManyArgs,
    ) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.UserDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.user.delete(params);
  }

  deleteMany(
    params: Prisma.UserDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.user.deleteMany(params);
  }
}
