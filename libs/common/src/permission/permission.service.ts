import { AdminPermissions } from '@apps/admin/src/admin.permission';
import { Module } from '@libs/common/src/module/module.interface';
import { ModuleService } from '@libs/common/src/module/module.service';
import { Permission } from '@libs/common/src/permission/permission.interface';
import { Role } from '@libs/common/src/role/role.interface';
import { UserRoleService } from '@libs/common/src/user-role/user-role.service';
import { Prisma, Scope } from '@libs/prisma/client';
import { ActionRepository } from '@libs/repositories/action.repository';
import { FeatureRepository } from '@libs/repositories/feature.repository';
import { PermissionRepository } from '@libs/repositories/permission.repository';
import { RoleRepository } from '@libs/repositories/role.repository';
import { StringUtil } from '@libs/utils/string.util';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PermissionService {
  private logger = new Logger(PermissionService.name);
  constructor(
    private readonly moduleService: ModuleService,
    private readonly roleRepository: RoleRepository,
    private readonly featureRepository: FeatureRepository,
    private readonly actionRepository: ActionRepository,
    private readonly permissionRepository: PermissionRepository,
    private readonly userRoleService: UserRoleService,
  ) {}

  async populate(moduleCode: Module.Codes) {
    const module = await this.moduleService.findOne({ code: moduleCode });

    let permissionMap;
    if (moduleCode === 'ADMIN') {
      permissionMap = AdminPermissions;
    } else if (moduleCode === 'CONSUMER') {
      // permissionMap = ConsumerPermissions;
    }

    for (const [permissions, scopes] of Object.entries(permissionMap)) {
      const [role, feature, action] = permissions.split('.');

      const existingRole = await this.roleRepository.upsert({
        create: {
          Module: { connect: { code: moduleCode } },
          code: role as Role.Codes,
          name: StringUtil.TitleCase(role),
        },
        update: {
          Module: { connect: { code: moduleCode } },
          code: role as Role.Codes,
          name: StringUtil.TitleCase(role),
        },
        where: {
          code_moduleID: {
            code: role,
            moduleID: module.ID,
          },
        },
      });

      const existingFeature = await this.featureRepository.upsert({
        create: {
          Module: { connect: { code: moduleCode } },
          code: feature,
          name: StringUtil.TitleCase(feature),
        },
        update: {
          Module: { connect: { code: moduleCode } },
          code: feature,
          name: StringUtil.TitleCase(feature),
        },
        where: {
          code_moduleID: {
            code: feature,
            moduleID: module.ID,
          },
        },
      });

      const existingAction = await this.actionRepository.upsert({
        create: {
          code: action,
          name: StringUtil.TitleCase(action),
        },
        update: {
          code: action,
          name: StringUtil.TitleCase(action),
        },
        where: { code: action },
      });

      for (const [scope] of Object.entries(scopes as any)) {
        await this.permissionRepository.upsert({
          create: {
            Action: { connect: { ID: existingAction.ID } },
            Feature: { connect: { ID: existingFeature.ID } },
            Module: { connect: { ID: module.ID } },
            Role: { connect: { ID: existingRole.ID } },
            scope: scope as Scope,
          },
          update: {
            Action: { connect: { ID: existingAction.ID } },
            Feature: { connect: { ID: existingFeature.ID } },
            Module: { connect: { ID: module.ID } },
            Role: { connect: { ID: existingRole.ID } },
            scope: scope as Scope,
          },
          where: {
            moduleID_featureID_actionID_roleID_scope: {
              actionID: existingAction.ID,
              featureID: existingFeature.ID,
              moduleID: module.ID,
              roleID: existingRole.ID,
              scope: scope as Scope,
            },
          },
        });
      }
    }
  }

  async get(params: Permission.Get.Params) {
    this.logger.debug('Getting user permission', params);
    const {
      user,
      userPermissions,
      moduleCode,
      actionCode,
      featureCode,
    } = params;

    const userRoles = await this.userRoleService.list({
      moduleCode,
      user,
      userPermissions,
    });

    const userRoleCodes = userRoles.map((userRole) => {
      return userRole.Role.code;
    });

    const allRoles = [...new Set(userRoleCodes)];

    const userPermissionMap: Record<string, Record<string, boolean>> = {};

    const permissions = await this.permissionRepository.findMany({
      where: {
        Action: { code: actionCode || Prisma.skip },
        Feature: { code: featureCode || Prisma.skip },
        Module: { code: moduleCode },
        Role: { code: { in: allRoles } },
      },
    });

    for (const permission of permissions) {
      const {
        Action, Feature,
      } = permission;

      if (!userPermissionMap[`${permission.Role.code}.${[Feature.code]}.${[Action.code]}`]) {
        userPermissionMap[`${permission.Role.code}.${[Feature.code]}.${[Action.code]}`] = {};
      }

      userPermissionMap[`${permission.Role.code}.${[Feature.code]}.${[Action.code]}`][permission.scope] = true;
    }

    return userPermissionMap;
  }
}
