import { getAdminApplication } from '@apps/admin/src/admin.application';
import { AuthGuard } from '@libs/common/src/auth/auth.guard';
import { UserService } from '@libs/common/src/user/user.service';
import { ResponseInterceptor } from '@libs/interceptors/response/response.interceptor';
import { dayjs } from '@libs/utils/dayjs.util';
import { Reflector } from '@nestjs/core';
import cors from 'cors';

async function bootstrap() {
  const {
    app, config,
  } = await getAdminApplication();
  // const config = app.get<Config.Provider>(Config.TOKEN);
  app.setGlobalPrefix('v1');
  app.use(cors({
    credentials: true,
    maxAge: dayjs.duration(1, 'day').asSeconds(),
    origin: [config.ADMIN_FRONTEND_HOSTNAME],
  }));

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalGuards(
    new AuthGuard(app.get(Reflector), app.get(UserService)),
  );

  await app.listen(config.ADMIN_PORT ?? 3000);

}
bootstrap();
