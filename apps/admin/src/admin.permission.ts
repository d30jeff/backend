import { Permission } from '@libs/common/src/permission/permission.interface';

const Map = {
  Shareholder: {
    Account: {
      Create: [],
      Delete: [],
      Download: [],
      Read: ['Own'],
      Transfer: [],
      Update: [],
    },
    Country: {
      Create: [],
      Delete: [],
      Read: [],
      Update: [],
    },
    Permission: { Read: ['Own', 'All'] },
    Profile: {
      Create: ['Own'],
      Read: ['All'],
    },
    Upload: {
      Create: ['Own'],
    },
    Workspace: {
      Create: [],
      Delete: [],
      Download: [],
      Read: [],
      Transfer: [],
      Update: [],
    },
  },
  SuperAdmin: {
    Account: { Read: ['All'] },
    Country: {
      Create: ['All'],
      Delete: ['All'],
      Read: ['All'],
      Update: ['All'],
    },
    Permission: { Read: ['Own'] },
    Profile: {
      Read: ['Own', 'All'],
      Update: ['Own', 'All'],
    },
    Upload: {
      Create: ['All'],
    },
    Workspace: {
      Create: ['All'],
      Delete: ['All'],
      Read: ['All'],
      Update: ['All'],
    },
  },
} as const satisfies Permission.PermissionMap;

export const AdminPermissions = Permission.createFlatPermissions(Map);

export type AdminPermissions = typeof AdminPermissions;
