import { Auth } from '@apps/admin/src/auth/auth.interface';

declare module 'express-session' {
  interface SessionData {
    user: Auth.Response;
  }
}
