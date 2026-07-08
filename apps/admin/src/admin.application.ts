import { AdminModule } from '@apps/admin/src/admin.module';
import { AuthGuard } from '@libs/common/src/auth/auth.guard';
import { Module } from '@libs/common/src/module/module.interface';
import { PermissionGuard } from '@libs/common/src/permission/permission.guard';
import { PermissionService } from '@libs/common/src/permission/permission.service';
import { UserService } from '@libs/common/src/user/user.service';
import { UserRoleService } from '@libs/common/src/user-role/user-role.service';
import { BadRequestException } from '@libs/exceptions/http-exception';
import { extractPropertiesAndConstraint } from '@libs/filters/all-exceptions.filter';
import { System } from '@libs/interfaces/system/system.interface';
import { Config } from '@libs/providers/config/config.interface';
import { Redis } from '@libs/services/redis/redis.interface';
import { dayjs } from '@libs/utils/dayjs.util';
import { requestID } from '@libs/utils/request-id.util';
import { StringUtil } from '@libs/utils/string.util';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import compression from 'compression';
import RedisStore from 'connect-redis';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session, { CookieOptions, SessionOptions } from 'express-session';
import { express as useragent } from 'express-useragent';
import helmet from 'helmet';

export const getAdminApplication = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AdminModule);
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
    maxAge: dayjs.duration(48, 'hours').asMilliseconds(),
    sameSite: isDevelopment || isTest ? 'lax' : 'strict',
    secure: Boolean(!isDevelopment && !isTest),
  };

  const redis = app.get<Redis.Provider>(Redis.TOKEN);

  const sessionOptions: SessionOptions = {
    cookie: cookieOptions,
    genid: () => {
      const array = new Uint8Array(32);
      crypto.getRandomValues(array);
      return Array.from(array, (byte) => {
        return byte.toString(16).padStart(2, '0');
      }).join('');
    },
    name: StringUtil.PascalCase(`Poket${config.NODE_ENV}`),
    resave: true,
    saveUninitialized: false,
    secret: config.SESSION_SECRET,
    store: new RedisStore({ client: redis }),
  };

  app.use(session(sessionOptions));
  app.useGlobalGuards(
    new AuthGuard(app.get(Reflector), app.get(UserService)),
    new PermissionGuard(Module.Codes.Admin, app.get(Reflector), app.get(UserRoleService), app.get(PermissionService)),
  );

  return {
    app,
    config,
  };
};
