import type { Notification } from 'firebase-admin/messaging';

export namespace Firebase {
  export const TOKEN = 'FIREBASE_TOKEN';

  export namespace SendMessage {
    export type Params = {
      notification: Notification;
    };
  }

  export namespace DecodeToken {
    export type Params = {
      idToken: string;
    };
  }

}
