import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { TransactionSelect } from '@libs/repositories/transaction.repository';
import { UploadSelect } from '@libs/repositories/upload.repository';
import { WithOptionalID } from '@libs/utils/prisma.util';
import { Inject, Injectable } from '@nestjs/common';

export const TransactionAttachmentSelect = {
  ID: true,
  Transaction: { select: TransactionSelect },
  Upload: { select: UploadSelect },
} satisfies Prisma.TransactionAttachmentSelect;

type WithSelectDefault<T = Partial<typeof TransactionAttachmentSelect>> = T;

type WithReturnType<
  S extends Prisma.TransactionAttachmentSelect
> = Prisma.TransactionAttachmentGetPayload<{ select: S }>;

export type TransactionAttachmentFields = Prisma.TransactionAttachmentGetPayload<{
  select: typeof TransactionAttachmentSelect
}>;

@Injectable()
export class TransactionAttachmentRepository {
  constructor(@Inject(Database.TOKEN) private readonly database: Database.Provider) { }

  aggregate(
    params: Prisma.TransactionAttachmentAggregateArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.transactionAttachment.aggregate(params);
  }

  upsert<S extends WithSelectDefault>(
    params: Omit<Prisma.TransactionAttachmentUpsertArgs, 'create' | 'update'> & {
      select?: S;
      create?: WithOptionalID<Prisma.TransactionAttachmentCreateInput>;
      update?: WithOptionalID<Prisma.TransactionAttachmentUpdateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.transactionAttachment.upsert({
      ...params,
      select: params.select || TransactionAttachmentSelect,
    } as Prisma.TransactionAttachmentUpsertArgs) as unknown as Promise<WithReturnType<S>>;
  }

  create<S extends WithSelectDefault>(
    params: Omit<Prisma.TransactionAttachmentCreateArgs, 'data'> & {
      data: WithOptionalID<Prisma.TransactionAttachmentCreateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Prisma.TransactionAttachmentGetPayload<{ select: S }>> {
    return connection.transactionAttachment.create(
      {
        ...params,
        select: params.select || TransactionAttachmentSelect,
      } as Prisma.TransactionAttachmentCreateArgs,
    ) as unknown as Promise<Prisma.TransactionAttachmentGetPayload<{ select: S }>>;
  }

  createMany<S extends WithSelectDefault>(
    params: Omit<Prisma.TransactionAttachmentCreateManyArgs, 'data'> & {
      data?: Array<WithOptionalID<Prisma.TransactionAttachmentCreateManyInput>>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.transactionAttachment.createMany(
      { ...params } as Prisma.TransactionAttachmentCreateManyArgs,
    ) as unknown as Promise<
      Array<WithReturnType<S>>
    >;
  }

  findFirst<S extends WithSelectDefault>(
    params: Omit<Prisma.TransactionAttachmentFindFirstArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<WithReturnType<S>> {
    return connection.transactionAttachment.findFirst({
      ...params,
      select: params.select || TransactionAttachmentSelect,
    }) as unknown as Promise<WithReturnType<S>>;
  }

  findMany<S extends WithSelectDefault>(
    params: Omit<Prisma.TransactionAttachmentFindManyArgs, 'select'> & {
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.read,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.transactionAttachment.findMany({
      ...params,
      select: params.select || TransactionAttachmentSelect,
    }) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  count(
    params: Prisma.TransactionAttachmentCountArgs,
    connection: Prisma.TransactionClient = this.database.read,
  ) {
    return connection.transactionAttachment.count(params);
  }

  update<S extends WithSelectDefault>(
    params: Omit<Prisma.TransactionAttachmentUpdateArgs, 'data'> & {
      data: WithOptionalID<Prisma.TransactionAttachmentUpdateInput>;
      select?: S
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<WithReturnType<S>> {
    return connection.transactionAttachment.update({
      ...params,
      select: params.select || TransactionAttachmentSelect,
      } as Prisma.TransactionAttachmentUpdateArgs) as unknown as Promise<WithReturnType<S>>;
  }

  updateMany<S extends WithSelectDefault>(
    params: Omit<Prisma.TransactionAttachmentUpdateManyArgs, 'data'> & {
      data: WithOptionalID<Prisma.TransactionAttachmentCreateInput>;
    },
    connection: Prisma.TransactionClient = this.database.write,
  ): Promise<Array<WithReturnType<S>>> {
    return connection.transactionAttachment.updateMany(
      { ...params } as Prisma.TransactionAttachmentUpdateManyArgs,
    ) as unknown as Promise<Array<WithReturnType<S>>>;
  }

  delete(
    params: Prisma.TransactionAttachmentDeleteArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.transactionAttachment.delete(params);
  }

  deleteMany(
    params: Prisma.TransactionAttachmentDeleteManyArgs,
    connection: Prisma.TransactionClient = this.database.write,
  ) {
    return connection.transactionAttachment.deleteMany(params);
  }
}
