import { AuthGuard } from '@libs/common/src/auth/auth.guard';
import { UserService } from '@libs/common/src/user/user.service';
import { BadRequestException } from '@libs/exceptions/http-exception';
import { extractPropertiesAndConstraint } from '@libs/filters/all-exceptions.filter';
import { ResponseInterceptor } from '@libs/interceptors/response/response.interceptor';
import { System } from '@libs/interfaces/system/system.interface';
import { Config } from '@libs/providers/config/config.interface';
import { Redis } from '@libs/services/redis/redis.interface';
import { dayjs } from '@libs/utils/dayjs.util';
import { requestID } from '@libs/utils/request-id.util';
import {
  DynamicModule,
  ForwardReference,
  NestApplicationOptions,
  Type,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { CookieOptions } from 'express-session';
import { express as useragent } from 'express-useragent';
import helmet from 'helmet';

type IEntryNestModule = Type<any> | DynamicModule | ForwardReference | Promise<IEntryNestModule>;

export async function createApplication(module: IEntryNestModule, options?: NestApplicationOptions) {
  const app = await NestFactory.create<NestExpressApplication>(module, options);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors) {
        const formattedErrors = [];
        extractPropertiesAndConstraint(errors, formattedErrors);
        throw new BadRequestException('Bad Request', formattedErrors, '');
      },
    }),
  );

  const config = app.get<Config.Provider>(Config.TOKEN);

  app.setGlobalPrefix('v1');

  app.use(
    useragent(),
    compression(),
    helmet({
      contentSecurityPolicy: false,
      hidePoweredBy: true,
      noSniff: true,
    }),
    requestID({ headerName: 'X-Request-ID' }),
    cookieParser(),
    cors({
      credentials: true,
      maxAge: dayjs.duration(1, 'day').asSeconds(),
      origin: [config.ADMIN_FRONTEND_HOSTNAME],
    }),
  );

  const originURL = new URL(config.ADMIN_FRONTEND_HOSTNAME);

  const isDevelopment = config.NODE_ENV === System.Environments.Development;
  const isTest = config.NODE_ENV === System.Environments.Testing;

  const cookieOptions: CookieOptions = {
    domain: originURL.hostname,
    httpOnly: true,
    maxAge: dayjs.duration(8, 'hour').asMilliseconds(),
    sameSite: isDevelopment || isTest ? 'lax' : 'strict',
    secure: Boolean(!isDevelopment && !isTest),
  };

  const redis = app.get<Redis.Provider>(Redis.TOKEN);

  app.set('trust proxy', 1);

  app.useGlobalGuards(
    new AuthGuard(app.get(Reflector), app.get(UserService)),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  return {
    app,
    config,
  };
}
