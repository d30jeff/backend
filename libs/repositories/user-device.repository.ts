import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';

export const UserDeviceSelect = {
  ID: true,
  createdAt: true,
  token: true,
  updatedAt: true,
} satisfies Prisma.UserDeviceSelect;

type WithSelectDefault<T = Partial<typeof UserDeviceSelect>> = T;

type WithReturnType<S extends Prisma.UserDeviceSelect> = Prisma.UserDeviceGetPayload<{ select: S }>;

export type UserDeviceFields = Prisma.UserDeviceGetPayload<{
  select: typeof UserDeviceSelect
}>;

@Injectable()
export class UserDeviceRepository {
  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.UserDeviceAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.userDevice.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.UserDeviceUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.UserDeviceCreateInput>;
      update?: WithOptionalID<Prisma.UserDeviceUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.userDevice.upsert({
      ...params,
      select: params.select || UserDeviceSelect,
    } as Prisma.UserDeviceUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.UserDeviceCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.UserDeviceCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.UserDeviceGetPayload<{ select: S }>> {
    return connection.userDevice.create({
      ...params,
      select: params.select || UserDeviceSelect,
    } as Prisma.UserDeviceCreateArgs) as unknown as Promise<Prisma.UserDeviceGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.UserDeviceCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.UserDeviceCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.userDevice.createMany({ ...params } as Prisma.UserDeviceCreateManyArgs) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.UserDeviceFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.userDevice.findFirst({
      ...params,
      select: params.select || UserDeviceSelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.UserDeviceFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.userDevice.findMany({
      ...params,
      select: params.select || UserDeviceSelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.UserDeviceCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.userDevice.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.UserDeviceUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.UserDeviceUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.userDevice.update({
      ...params,
      select: params.select || UserDeviceSelect,
    } as Prisma.UserDeviceUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.UserDeviceUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.UserDeviceCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.userDevice.updateMany(
      { ...params } as Prisma.UserDeviceUpdateManyArgs,
    ) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.UserDeviceDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.userDevice.delete(params);
  }

  deleteMany(
    params: Prisma.UserDeviceDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.userDevice.deleteMany(params);
  }
}
