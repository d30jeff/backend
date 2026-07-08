import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { PlanSelect } from '@libs/repositories/plan.repository';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';

export const PlanPriceSelect = {
  ID: true,
  Plan: { select: PlanSelect },
  amountInCents: true,
  createdAt: true,
  currency: true,
  interval: true,
  stripeID: true,
  updatedAt: true,
} satisfies Prisma.PlanPriceSelect;

type WithSelectDefault<T = Partial<typeof PlanPriceSelect>> = T;

type WithReturnType<S extends Prisma.PlanPriceSelect> = Prisma.PlanPriceGetPayload<{ select: S }>;

export type PlanPriceFields = Prisma.PlanPriceGetPayload<{
  select: typeof PlanPriceSelect
}>;

@Injectable()
export class PlanPriceRepository {
  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.PlanPriceAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.planPrice.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.PlanPriceUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.PlanPriceCreateInput>;
      update?: WithOptionalID<Prisma.PlanPriceUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.planPrice.upsert({
      ...params,
      select: params.select || PlanPriceSelect,
    } as Prisma.PlanPriceUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.PlanPriceCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.PlanPriceCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.PlanPriceGetPayload<{ select: S }>> {
    return connection.planPrice.create({
      ...params,
       select: params.select || PlanPriceSelect,
    } as Prisma.PlanPriceCreateArgs) as unknown as Promise<Prisma.PlanPriceGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.PlanPriceCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.PlanPriceCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.planPrice.createMany({ ...params } as Prisma.PlanPriceCreateManyArgs) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.PlanPriceFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.planPrice.findFirst({
      ...params,
      select: params.select || PlanPriceSelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.PlanPriceFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.planPrice.findMany({
      ...params,
      select: params.select || PlanPriceSelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.PlanPriceCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.planPrice.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.PlanPriceUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.PlanPriceUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.planPrice.update({
      ...params,
      select: params.select || PlanPriceSelect,
      } as Prisma.PlanPriceUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.PlanPriceUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.PlanPriceCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.planPrice.updateMany(
      { ...params } as Prisma.PlanPriceUpdateManyArgs,
    ) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.PlanPriceDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.planPrice.delete(params);
  }

  deleteMany(
    params: Prisma.PlanPriceDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.planPrice.deleteMany(params);
  }
}
