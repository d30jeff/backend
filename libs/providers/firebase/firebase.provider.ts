import { Config } from '@libs/providers/config/config.interface';
import { Firebase } from '@libs/providers/firebase/firebase.interface';
import { Provider } from '@nestjs/common';
import firebaseAdmin from 'firebase-admin';

export const FirebaseProvider: Provider = {
  inject: [Config.TOKEN],
  provide: Firebase.TOKEN,
  useFactory: async(config: Config.Provider): Promise<firebaseAdmin.app.App> => {

    const serviceAccountJson = Buffer.from(config.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64')
      .toString('utf-8');

    const credential = firebaseAdmin.credential.cert(JSON.parse(serviceAccountJson));
    const firebase = firebaseAdmin.initializeApp({ credential });
    return firebase;
  },
};
