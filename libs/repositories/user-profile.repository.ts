import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { UploadSelect } from '@libs/repositories/upload.repository';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';

export const UserProfileSelect = {
  ID: true,
  Upload: { select: UploadSelect },
  createdAt: true,
  dateOfBirth: true,
  firstName: true,
  gender: true,
  lastName: true,
  profileCompletedAt: true,
  updatedAt: true,
} satisfies Prisma.UserProfileSelect;

type WithSelectDefault<T = Partial<typeof UserProfileSelect>> = T;

type WithReturnType<S extends Prisma.UserProfileSelect> = Prisma.UserProfileGetPayload<{ select: S }>;

export type UserProfileFields = Prisma.UserProfileGetPayload<{
  select: typeof UserProfileSelect
}>;

@Injectable()
export class UserProfileRepository {
  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.UserProfileAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.userProfile.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.UserProfileUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.UserProfileCreateInput>;
      update?: WithOptionalID<Prisma.UserProfileUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.userProfile.upsert({
      ...params,
      select: params.select || UserProfileSelect,
    } as Prisma.UserProfileUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.UserProfileCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.UserProfileCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.UserProfileGetPayload<{ select: S }>> {
    return connection.userProfile.create({
      ...params,
      select: params.select || UserProfileSelect,
    } as Prisma.UserProfileCreateArgs) as unknown as Promise<Prisma.UserProfileGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.UserProfileCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.UserProfileCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.userProfile.createMany({ ...params } as Prisma.UserProfileCreateManyArgs) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.UserProfileFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.userProfile.findFirst({
      ...params,
      select: params.select || UserProfileSelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.UserProfileFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.userProfile.findMany({
      ...params,
      select: params.select || UserProfileSelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.UserProfileCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.userProfile.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.UserProfileUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.UserProfileUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.userProfile.update({
      ...params,
      select: params.select || UserProfileSelect,
    } as Prisma.UserProfileUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.UserProfileUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.UserProfileCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.userProfile.updateMany(
      { ...params } as Prisma.UserProfileUpdateManyArgs,
    ) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.UserProfileDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.userProfile.delete(params);
  }

  deleteMany(
    params: Prisma.UserProfileDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.userProfile.deleteMany(params);
  }
}
