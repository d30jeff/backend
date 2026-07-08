import {
  CreateBucketCommand,
  GetBucketCorsCommand,
  HeadBucketCommand,
  PutBucketCorsCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Common } from '@libs/common/src/common.interface';
import { Module } from '@libs/common/src/module/module.interface';
import { Config } from '@libs/providers/config/config.interface';
import { S3 } from '@libs/providers/s3/s3.interface';
import { UploadFields } from '@libs/repositories/upload.repository';
import { axios } from '@libs/utils/axios.util';
import { dayjs } from '@libs/utils/dayjs.util';
import {
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class S3Service {
  private readonly logger = new Logger(S3Service.name);
  constructor(
    @Inject(Common.Provider) private readonly common: Common.ModuleOptions,
    @Inject(Config.TOKEN) private readonly config: Config.Provider,
    @Inject(S3.TOKEN) private readonly s3Provider: S3.Provider,
  ) { }

  async initialize() {
    try {
      this.logger.debug(`Checking bucket: ${this.config.AWS_BUCKET}`);
      await this.s3Provider.send(
        new HeadBucketCommand({ Bucket: this.config.AWS_BUCKET }),
      );
    } catch (error) {
      console.log(error);
      this.logger.fatal(error, 'Something went wrong');
      if ((error as any).name === 'NotFound') {
        this.logger.error(`Bucket ${this.config.AWS_BUCKET} not found. Creating...`);
        await this.s3Provider.send(
          new CreateBucketCommand({ Bucket: this.config.AWS_BUCKET }),
        );
        this.logger.log('Successfully created');
      }
    } finally {
      await this.checkCorsOrigin();
    }
  }

  async checkCorsOrigin() {
    const origins = {
      [Module.Codes.Admin]: this.config.ADMIN_FRONTEND_HOSTNAME,
      [Module.Codes.Business]: this.config.BUSINESS_FRONTEND_HOSTNAME,
      [Module.Codes.Consumer]: this.config.CONSUMER_FRONTEND_HOSTNAME,
    };

    const origin = origins[this.common.module];

    const data = await this.s3Provider.send(new GetBucketCorsCommand({ Bucket: this.config.AWS_BUCKET }));
    this.logger.debug('Found CORS configuration', data);
    if (!data?.CORSRules) {
      this.logger.debug('No origin found. Setting...');
      const response = await this.s3Provider.send(
        new PutBucketCorsCommand({
          Bucket: this.config.AWS_BUCKET,
          CORSConfiguration: {
            CORSRules: [
              {
                AllowedHeaders: ['*'],
                AllowedMethods: ['GET', 'PUT'],
                AllowedOrigins: [origin],
                ExposeHeaders: ['ETag'],
                MaxAgeSeconds: 3000,
              },
            ],
          },
        }),
      );
      this.logger.debug('Response from CORS setting:', response);
    }
    console.log('Active CORS Configuration:', JSON.stringify(data.CORSRules, null, 2));
  }

  async createSignedUploadUrl(upload: UploadFields) {
    this.logger.debug('Creating signed upload url', upload);
    const {
      fileSizeInBytes,
      key,
      mimetype,
    } = upload;

    this.logger.debug('Creating signed upload URL', {
      Bucket: this.config.AWS_BUCKET,
      Key: key,
    });

    const url = await getSignedUrl(
      this.s3Provider,
      new PutObjectCommand({
        Bucket: this.config.AWS_BUCKET,
        ContentLength: fileSizeInBytes,
        ContentType: mimetype,
        Key: key,
      }),
      { expiresIn: dayjs.duration(10, 'minutes').asSeconds() },
    );

    return {
      key,
      url,
    };
  }

  async createSignedGetUrl(upload: UploadFields) {
    // return getSignedUrl(
    //   s3Client,
    //   new GetObjectCommand({
    //     Bucket: config.AWS_BUCKET,
    //     Key: upload.key,
    //   }),
    // );
  }

  async uploadFromUrl(url: string, key) {
    const response = await axios({
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ImageDownloader/1.0)' },
      method: 'GET',
      responseType: 'arraybuffer', // Important: get raw binary data
      timeout: 30000, // 30 second timeout
      url: url,
    });

    const imageBuffer = Buffer.from(response.data);
    const contentType = response.headers['content-type'] || 'image/jpeg';

    // const command = new PutObjectCommand({
    //   Body: imageBuffer,
    //   Bucket: config.AWS_BUCKET,
    //   ContentLength: imageBuffer.length,
    //   ContentType: contentType,
    //   Key: key,
    //   Metadata: {
    //     'download-date': new Date().toISOString(),
    //     'original-size': imageBuffer.length.toString(),
    //   },
    // });

    // const s3Response = await s3Client.send(command);
    // console.log(`✅ Successfully uploaded to S3. ETag: ${s3Response.ETag}`);
  }

  upload() {
    // return s3Client.send(new PutObjectCommand({
    //   Bucket: config.AWS_BUCKET,
    //   Key:
    // }));
  }
}
