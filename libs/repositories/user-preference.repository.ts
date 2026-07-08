import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { LocaleSelect } from '@libs/repositories/locale.repository';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';

export const UserPreferenceSelect = {
  ID: true,
  Locale: { select: LocaleSelect },
  appearance: true,
  createdAt: true,
  setAt: true,
  updatedAt: true,
} satisfies Prisma.UserPreferenceSelect;

type WithSelectDefault<T = Partial<typeof UserPreferenceSelect>> = T;

type WithReturnType<S extends Prisma.UserPreferenceSelect> = Prisma.UserPreferenceGetPayload<{ select: S }>;

export type UserPreferenceFields = Prisma.UserPreferenceGetPayload<{
  select: typeof UserPreferenceSelect
}>;

@Injectable()
export class UserPreferenceRepository {
  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.UserPreferenceAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.userPreference.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.UserPreferenceUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.UserPreferenceCreateInput>;
      update?: WithOptionalID<Prisma.UserPreferenceUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.userPreference.upsert({
      ...params,
      select: params.select || UserPreferenceSelect,
    } as Prisma.UserPreferenceUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.UserPreferenceCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.UserPreferenceCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.UserPreferenceGetPayload<{ select: S }>> {
    return connection.userPreference.create({
      ...params,
       select: params.select || UserPreferenceSelect,
    } as Prisma.UserPreferenceCreateArgs) as unknown as Promise<Prisma.UserPreferenceGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.UserPreferenceCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.UserPreferenceCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.userPreference.createMany(
      { ...params } as Prisma.UserPreferenceCreateManyArgs,
    ) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.UserPreferenceFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.userPreference.findFirst({
      ...params,
      select: params.select || UserPreferenceSelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.UserPreferenceFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.userPreference.findMany({
      ...params,
      select: params.select || UserPreferenceSelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.UserPreferenceCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.userPreference.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.UserPreferenceUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.UserPreferenceUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.userPreference.update({
      ...params,
      select: params.select || UserPreferenceSelect,
      } as Prisma.UserPreferenceUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.UserPreferenceUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.UserPreferenceCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.userPreference.updateMany(
      { ...params } as Prisma.UserPreferenceUpdateManyArgs,
    ) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.UserPreferenceDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.userPreference.delete(params);
  }

  deleteMany(
    params: Prisma.UserPreferenceDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.userPreference.deleteMany(params);
  }
}
