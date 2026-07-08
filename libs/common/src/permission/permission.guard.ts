import { Module } from '@libs/common/src/module/module.interface';
import { PERMISSION_KEY, PermissionConfig } from '@libs/common/src/permission/permission.decorator';
import { Permission } from '@libs/common/src/permission/permission.interface';
import { PermissionService } from '@libs/common/src/permission/permission.service';
import { UserRole } from '@libs/common/src/user-role/user-role.interface';
import { UserRoleService } from '@libs/common/src/user-role/user-role.service';
import { ForbiddenException } from '@libs/exceptions/http-exception';
import { ExpressRequest } from '@libs/interfaces/express.interface';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  private logger = new Logger(PermissionGuard.name);
  constructor(
    private readonly module: Module.Codes,
    private reflector: Reflector,
    private readonly userRoleService: UserRoleService,
    private readonly permissionService: PermissionService,
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const resourcePermissions = this.reflector.getAllAndOverride<PermissionConfig>(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest<ExpressRequest>();

    if (!resourcePermissions) {
      this.logger.debug('No permission defined. Allowing action...');
      return true;
    }

    const permissions = await this.permissionService.get({
      moduleCode: this.module,
      user: request.session.user,
    });

    const userRoles = await this.userRoleService.list({
      moduleCode: this.module,
      user: request.session.user,
    });

    console.log({ userRoles });

    if (!userRoles.length) {
      this.logger.debug('User role not found');
      throw new UserRole.Exceptions.NotFound();
    }

    const rolePermissions = {} as Permission.UserPermission;

    for (const userRole of userRoles) {
      rolePermissions[`${userRole.Role.code}.${resourcePermissions}`] = true;
    }

    request.userPermissions = permissions;

    for (const [rolePermission] of Object.entries(rolePermissions)) {
      if (permissions[rolePermission]) {
        return true;
      }
    }

    throw new ForbiddenException('Insufficient permission', `Required permission: ${resourcePermissions}`);
  }
}
