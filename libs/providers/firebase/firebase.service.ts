import { Firebase } from '@libs/providers/firebase/firebase.interface';
import {
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import firebaseAdmin from 'firebase-admin';
import { CreateRequest } from 'node_modules/firebase-admin/lib/auth/auth-config';
import { UserRecord } from 'node_modules/firebase-admin/lib/auth/user-record';

@Injectable()
export class FirebaseService {
  private readonly logger = new Logger(FirebaseService.name);
  constructor(
    @Inject(Firebase.TOKEN) private readonly firebase: firebaseAdmin.app.App,
  ) { }

  sendMessage(params: Firebase.SendMessage.Params) {
    const { notification } = params;
    return this.firebase.messaging().sendEachForMulticast({
      notification,
      tokens: [],
    });
  }

  createUser(params: CreateRequest) {
    return this.firebase.auth().createUser(params);
  }

  createCustomToken(uid: string) {
    return this.firebase.auth().createCustomToken(uid);
  }

  async getUserByEmail(email: string): Promise<UserRecord> {
    return this.firebase.auth().getUserByEmail(email);
  }

  async decodeToken(params: Firebase.DecodeToken.Params): Promise<UserRecord> {
    const { idToken } = params;
    const user = await this.firebase.auth().verifyIdToken(idToken, true);
    this.logger.log('Found user from IDToken', user);
    return this.firebase.auth().getUser(user.uid);
  }
}
