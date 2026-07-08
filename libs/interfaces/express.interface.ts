import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { Session, SessionData } from 'express-session';

export type ExpressNextFunction = NextFunction;
export type ExpressResponse = Response;

export interface ExpressRequest extends Request {
  session: Session & Partial<SessionData>;
}
