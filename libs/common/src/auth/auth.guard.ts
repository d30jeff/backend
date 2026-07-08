import { IS_PUBLIC_KEY } from '@libs/common/src/auth/auth.decorator';
import { Auth } from '@libs/common/src/auth/auth.interface';
import { UserService } from '@libs/common/src/user/user.service';
import { ExpressRequest } from '@libs/interfaces/express.interface';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UserService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<ExpressRequest>();

    if (!request.session.user) {
      throw new Auth.Exceptions.InvalidSession();
    }

    return true;
  }
}
