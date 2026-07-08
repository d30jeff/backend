import { Common } from '@libs/common/src/common.interface';
import { Module } from '@libs/common/src/module/module.interface';
import { PermissionService } from '@libs/common/src/permission/permission.service';
import { User } from '@libs/common/src/user/user.interface';
import { CurrentUser } from '@libs/decorators/current-user.decorator';
import {
  Controller,
  Get,
  Inject,
} from '@nestjs/common';

@Controller('permissions')
export class PermissionController {
  constructor(
    @Inject(Common.Provider)
    private readonly module: Module.Codes,
    private readonly permissionService: PermissionService,
  ) {}

  @Get()
  async get(
    @CurrentUser() user: User.Response,
  ) {
    const permission = await this.permissionService.get({
      moduleCode: this.module,
      user,
    });

    return permission;
  }
}
