import { S3Client } from '@aws-sdk/client-s3';

export namespace S3 {
  export const TOKEN = 'S3_PROVIDER_TOKEN';
  export type Provider = S3Client;
}
