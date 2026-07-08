import { S3Client } from '@aws-sdk/client-s3';
import { Config } from '@libs/providers/config/config.interface';
import { S3 } from '@libs/providers/s3/s3.interface';
import { Provider } from '@nestjs/common';

export const S3Provider: Provider = {
  inject: [Config.TOKEN],
  provide: S3.TOKEN,
  useFactory: (config: Config.Provider): S3Client => {
    return new S3Client({
      credentials: {
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
      },
      endpoint: config.AWS_ENDPOINT_URL_S3,
      forcePathStyle: false,
      region: config.AWS_REGION,
      requestChecksumCalculation: 'WHEN_REQUIRED',
      responseChecksumValidation: 'WHEN_REQUIRED',
    });
  },
};
