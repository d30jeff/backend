import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';

export const UploadSelect = {
  ID: true,
  compressedAt: true,
  consumedAt: true,
  createdAt: true,
  fileSizeInBytes: true,
  key: true,
  mimetype: true,
  originalFileName: true,
} satisfies Prisma.UploadSelect;

type WithSelectDefault<T = Partial<typeof UploadSelect>> = T;

type WithReturnType<S extends Prisma.UploadSelect> = Prisma.UploadGetPayload<{ select: S }>;

export type UploadFields = Prisma.UploadGetPayload<{
  select: typeof UploadSelect
}>;

@Injectable()
export class UploadRepository {
  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.UploadAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.upload.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.UploadUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.UploadCreateInput>;
      update?: WithOptionalID<Prisma.UploadUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.upload.upsert({
      ...params,
      select: params.select || UploadSelect,
    } as Prisma.UploadUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.UploadCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.UploadCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.UploadGetPayload<{ select: S }>> {
    return connection.upload.create({
      ...params,
      select: params.select || UploadSelect,
    } as Prisma.UploadCreateArgs) as unknown as Promise<Prisma.UploadGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.UploadCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.UploadCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.upload.createMany({ ...params } as Prisma.UploadCreateManyArgs) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.UploadFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.upload.findFirst({
      ...params,
      select: params.select || UploadSelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.UploadFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.upload.findMany({
      ...params,
      select: params.select || UploadSelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.UploadCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.upload.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.UploadUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.UploadUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.upload.update({
      ...params,
      select: params.select || UploadSelect,
    } as Prisma.UploadUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.UploadUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.UploadCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.upload.updateMany(
      { ...params } as Prisma.UploadUpdateManyArgs,
    ) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.UploadDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.upload.delete(params);
  }

  deleteMany(
    params: Prisma.UploadDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.upload.deleteMany(params);
  }
}
