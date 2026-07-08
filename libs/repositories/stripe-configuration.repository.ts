import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';

export const StripeConfigurationSelect = {
  ID: true,
  createdAt: true,
  secretKey: true,
  updatedAt: true,
  webhookSecret: true,
} satisfies Prisma.StripeConfigurationSelect;

type WithSelectDefault<T = Partial<typeof StripeConfigurationSelect>> = T;

type WithReturnType<S extends Prisma.StripeConfigurationSelect> = Prisma.StripeConfigurationGetPayload<{ select: S }>;

export type StripeConfigurationFields = Prisma.StripeConfigurationGetPayload<{
  select: typeof StripeConfigurationSelect
}>;

@Injectable()
export class StripeConfigurationRepository {
  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.StripeConfigurationAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.stripeConfiguration.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.StripeConfigurationUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.StripeConfigurationCreateInput>;
      update?: WithOptionalID<Prisma.StripeConfigurationUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.stripeConfiguration.upsert({
      ...params,
      select: params.select || StripeConfigurationSelect,
    } as Prisma.StripeConfigurationUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.StripeConfigurationCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.StripeConfigurationCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.StripeConfigurationGetPayload<{ select: S }>> {
    return connection.stripeConfiguration.create(
      {
      ...params,
       select: params.select || StripeConfigurationSelect,
    } as Prisma.StripeConfigurationCreateArgs,
) as unknown as Promise<Prisma.StripeConfigurationGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.StripeConfigurationCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.StripeConfigurationCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.stripeConfiguration.createMany(
      { ...params } as Prisma.StripeConfigurationCreateManyArgs,
) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.StripeConfigurationFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.stripeConfiguration.findFirst({
      ...params,
      select: params.select || StripeConfigurationSelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.StripeConfigurationFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.stripeConfiguration.findMany({
      ...params,
      select: params.select || StripeConfigurationSelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.StripeConfigurationCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.stripeConfiguration.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.StripeConfigurationUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.StripeConfigurationUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.stripeConfiguration.update({
      ...params,
      select: params.select || StripeConfigurationSelect,
      } as Prisma.StripeConfigurationUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.StripeConfigurationUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.StripeConfigurationCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.stripeConfiguration.updateMany(
      { ...params } as Prisma.StripeConfigurationUpdateManyArgs,
) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.StripeConfigurationDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.stripeConfiguration.delete(params);
  }

  deleteMany(
    params: Prisma.StripeConfigurationDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.stripeConfiguration.deleteMany(params);
  }
}
