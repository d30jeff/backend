import { Auth } from '@apps/admin/src/auth/auth.interface';
import { Permission } from '@apps/admin/src/permission/permission.interface';

declare global {
  namespace Express {
    interface Request {
      user: Auth.Response;
      userPermissions: Permission.UserPermission;
    }
  }
}
