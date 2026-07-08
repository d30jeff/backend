import path from 'node:path';

import { Upload } from '@libs/common/src/upload/upload.interface';
import { Prisma } from '@libs/prisma/client';
import { Database } from '@libs/providers/database/database.interface';
import { generateID } from '@libs/providers/nanoid.provider';
import { S3 } from '@libs/providers/s3/s3.interface';
import { S3Service } from '@libs/providers/s3/s3.service';
import { UploadRepository } from '@libs/repositories/upload.repository';
import { axios } from '@libs/utils/axios.util';
import { dayjs } from '@libs/utils/dayjs.util';
import { typeToExtension } from '@libs/utils/mime-types.util';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  constructor(
    @Inject(Database.TOKEN) private readonly database: Database.Provider,
    @Inject(S3.TOKEN)
    private readonly s3Provider: S3.Provider,
    private readonly uploadRepository: UploadRepository,
    private readonly s3Service: S3Service,
  ) {}

  async create(params: Upload.Create.Params, tx?: Prisma.TransactionClient) {
    // TODO: Check user plan to limit the amount of upload
    const {
      userID,
      contentLength,
      originalFileName,
      mimetype,
    } = params;

    const key = path.join(userID, `${generateID('object')}.${typeToExtension(mimetype)}`);

    return this.uploadRepository.create({
      data: {
        CreatedBy: { connect: { ID: userID } },
        fileSizeInBytes: contentLength,
        key,
        mimetype,
        originalFileName,
      },
    }, tx);
  }

  async uploadFromUrl(params: Upload.UploadFromUrl.Params, tx?: Prisma.TransactionClient) {
    const {
      url, userID,
    } = params;

    const response = await axios({
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ImageDownloader/1.0)' },
      method: 'GET',
      responseType: 'arraybuffer',
      timeout: dayjs.duration(10, 'seconds').asMilliseconds(),
      url: url,
    });

    const imageBuffer = Buffer.from(response.data);
    const mimetype = response.headers['content-type'] as string || 'image/jpeg';
    const contentLength = response.headers['content-length'];

    const upload = await this.create({
      contentLength: Number(contentLength),
      mimetype,
      originalFileName: response.headers['content-disposition'],
      userID,
    }, tx);

    // const command = new PutObjectCommand({
    //   Body: imageBuffer,
    //   Bucket: config.AWS_BUCKET,
    //   ContentLength: imageBuffer.length,
    //   ContentType: mimetype,
    //   Key: upload.key,
    //   Metadata: {
    //     'download-date': new Date().toISOString(),
    //     'original-size': imageBuffer.length.toString(),
    //   },
    // });

    // const s3Response = await s3Client.send(command);
    // console.log(`✅ Successfully uploaded to S3. ETag: ${s3Response.ETag}`);
    // return upload;
  }

  async createSignedUploadUrl(params: Upload.CreateSignedUploadUrl.Params) {
    const upload = await this.create(params);
    const response = await this.s3Service.createSignedUploadUrl(upload);
    return {
      ID: upload.ID,
      ...response,
    };
  }

  async findOne(params: Upload.FindOne.Params) {
    const {
      ID,
      user,
      options,
    } = params;

    const where: Prisma.UploadWhereInput = {
      ID: ID || Prisma.skip,
      createdByUserID: user.ID,
    };

    const upload = await this.uploadRepository.findFirst({ where });

    if (!upload && options?.throwIfNotFound) {
      throw new Upload.Exceptions.NotFound();
    }

    return upload;
  }

  async generateReadUrl(params: Upload.GenerateReadUrl.Params) {
    const upload = await this.findOne({
      ...params,
      options: { throwIfNotFound: true },
    });

    return this.s3Service.createSignedGetUrl(upload);
  }

  async delete(params: Upload.Delete.Params) {
    const {
      ID, user,
    } = params;

    const existing = await this.findOne(params);

    if (existing) {
      await this.uploadRepository.delete({
        where: {
          ID,
          createdByUserID: user.ID,
        },
      });
    }
  }
}
