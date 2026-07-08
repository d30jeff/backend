import { Action } from '@libs/common/src/action/action.interface';
import { Feature } from '@libs/common/src/feature/feature.interface';
import { Module } from '@libs/common/src/module/module.interface';
import { Role } from '@libs/common/src/role/role.interface';
import { ForbiddenException, InternalServerErrorException } from '@libs/exceptions/http-exception';
import { System } from '@libs/interfaces/system/system.interface';
import { PaginationQueries } from '@libs/utils/pagination.util';
import { DeepPartial } from '@libs/utils/type.util';

export namespace Permission {
  export const Provider = 'PERMISSION_PROVIDER';

  export const Scope = {
    All: 'All',
    Own: 'Own',
  } as const;

  export type Scope = (typeof Scope)[keyof typeof Scope];
  export type FeaturePermission = DeepPartial<Record<Feature.Codes, Record<Action.Codes, Scope[]>>>;
  export type PermissionMap = DeepPartial<Record<Role.Codes, FeaturePermission>>;
  export type UserPermission = Record<`${Role.Codes}.${Feature.Codes}.${Action.Codes}`, Record<Scope, true>>;

  export type FlatPermissionKeys<T extends PermissionMap> = {
    [R in keyof T]: {
      [F in keyof T[R]]: {
        [A in keyof T[R][F]]: T[R][F][A] extends readonly (infer S)[]
        ? `${string & R}.${string & F}.${string & A}`
        : never
      }[keyof T[R][F]]
    }[keyof T[R]]
  }[keyof T];

  export type FlatPermissions<T extends PermissionMap> = Record<FlatPermissionKeys<T>, Record<Scope, true>>;

  export const createFlatPermissions = <T extends PermissionMap>(
    map: T,
  ): FlatPermissions<T> => {
    const results = {} as any;

    for (const [role, features] of Object.entries(map)) {
      for (const [feature, actions] of Object.entries(features)) {
        for (const [action, scopes] of Object.entries(actions)) {
          const key = `${role}.${feature}.${action}`;
          results[key] = {};
          for (const scope of scopes) {
            results[key][scope!] = true;
          }
        }
      }
    }

    return results;
  };

  export namespace Exceptions {
    export const Codes = {
      InsufficientPermission: 'INSUFFICIENT_PERMISSION',
      InvalidPermissionSet: 'INVALID_PERMISSION_SET',
    } as const;

    export class InsufficientPermission extends ForbiddenException {
      constructor(details = 'Your current account does not have the required permission') {
        super('Insufficient permission', details, Codes.InsufficientPermission);
      }
    }

    export class InvalidPermissionSet extends InternalServerErrorException {
      constructor(details = 'The permission set is invalid') {
        super('Invalid permission set', Codes.InvalidPermissionSet, details);
      }
    }
  }

  export namespace Get {
    export type Params = System.WithAuthenticatedUser<{
      moduleCode: Module.Codes;
      featureCode?: Feature.Codes;
      actionCode?: Action.Codes;
      scope?: Scope
    }>;
  }

  export namespace HasPermission {
    export type Params = {
      moduleCode: Module.Codes;
      featureCode: System.Feature.Codes;
      actionCodes: Action.Codes[];
      roleCodes: Role.Codes[];
    };
  }

  export namespace Create {
    export type Params = {
      moduleCode: Module.Codes;
      featureCode: Feature.Codes;
      actionCode: Action.Codes;
      roleCode: Role.Codes;
    };
  }

  export namespace Check {
    export type Params = HasPermission.Params;
  }

  export namespace List {
    export type QueryParams = PaginationQueries;
    export type Params = QueryParams & Partial<Omit<Check.Params, 'moduleCodes'>> & {
      roleCode: Role.Codes;
    };
  }

  export namespace FindOne {
    export type Params = Partial<Create.Params>;
  }
}
