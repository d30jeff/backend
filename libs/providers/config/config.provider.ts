import { System } from '@libs/interfaces/system/system.interface';
import { Config } from '@libs/providers/config/config.interface';
import { Provider } from '@nestjs/common';
import dotenv from 'dotenv';
import {
  cleanEnv,
  num,
  str,
} from 'envalid';

export const schema = {
  ADMIN_FRONTEND_HOSTNAME: str({ desc: 'The frontend application hostname' }),
  ADMIN_PORT: num(),
  AWS_ACCESS_KEY_ID: str(),
  AWS_BUCKET: str(),
  AWS_ENDPOINT_URL_S3: str(),
  AWS_REGION: str(),
  AWS_SECRET_ACCESS_KEY: str(),
  BUSINESS_FRONTEND_HOSTNAME: str(),
  BUSINESS_PORT: num(),
  CONSUMER_FRONTEND_HOSTNAME: str(),
  CONSUMER_PORT: num(),
  DATABASE_READ_REPLICA_URL: str(),
  DATABASE_URL: str(),
  FIREBASE_SERVICE_ACCOUNT_BASE64: str(),
  JWT_SECRET: str(),
  NODE_ENV: str({ default: System.Environments.Development }),
  REDIS_URL: str(),
  SESSION_SECRET: str(),
  SMTP_HOST_NAME: str(),
  SMTP_PASSWORD: str(),
  SMTP_PORT: num(),
  SMTP_USERNAME: str(),
};

export const baseConfig = async (): Promise<Record<keyof typeof schema, string>> => {
  return {
    ADMIN_FRONTEND_HOSTNAME: process.env.ADMIN_FRONTEND_HOSTNAME!,
    ADMIN_PORT: process.env.ADMIN_PORT!,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID!,
    AWS_BUCKET: process.env.AWS_BUCKET!,
    AWS_ENDPOINT_URL_S3: process.env.AWS_ENDPOINT_URL_S3!,
    AWS_REGION: process.env.AWS_REGION!,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY!,
    BUSINESS_FRONTEND_HOSTNAME: process.env.BUSINESS_FRONTEND_HOSTNAME!,
    BUSINESS_PORT: process.env.BUSINESS_PORT!,
    CONSUMER_FRONTEND_HOSTNAME: process.env.CONSUMER_FRONTEND_HOSTNAME!,
    CONSUMER_PORT: process.env.CONSUMER_PORT!,
    DATABASE_READ_REPLICA_URL: process.env.DATABASE_READ_REPLICA_URL!,
    DATABASE_URL: process.env.DATABASE_URL!,
    FIREBASE_SERVICE_ACCOUNT_BASE64: process.env.FIREBASE_SERVICE_ACCOUNT_BASE64!,
    JWT_SECRET: process.env.JWT_SECRET!,
    NODE_ENV: process.env.NODE_ENV!,
    REDIS_URL: process.env.REDIS_URL!,
    SESSION_SECRET: process.env.SESSION_SECRET!,
    SMTP_HOST_NAME: process.env.SMTP_HOST_NAME!,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD!,
    SMTP_PORT: process.env.SMTP_PORT!,
    SMTP_USERNAME: process.env.SMTP_USERNAME!,
  };
};

export const ConfigProvider: Provider = {
  provide: Config.TOKEN,
  useFactory: async () => {
    const isLocalDevelopment = [System.Environments.Development, System.Environments.Testing].includes(
      (process.env.NODE_ENV || System.Environments.Development)?.toLowerCase() as any,
    );

    if (isLocalDevelopment) {
      dotenv.config({
        quiet: true,
      });
    }

    const resolvedBaseConfig = await baseConfig();

    const cleanedEnv = cleanEnv(resolvedBaseConfig, schema);
    return { ...cleanedEnv };
  },
};
