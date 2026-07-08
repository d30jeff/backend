import { Action } from '@libs/common/src/action/action.interface';
import { Feature } from '@libs/common/src/feature/feature.interface';
import { applyDecorators, SetMetadata } from '@nestjs/common';

export type PermissionConfig = `${Feature.Codes}.${Action.Codes}`;

export const PERMISSION_KEY = 'PERMISSION_KEY';

export const RequiredPermission = (permission: PermissionConfig) => {
  return applyDecorators(
    SetMetadata(PERMISSION_KEY, permission),
  );
};
