import { ConfigProvider } from '@libs/providers/config/config.provider';
import { DatabaseProvider } from '@libs/providers/database/database.provider';
import { FirebaseProvider } from '@libs/providers/firebase/firebase.provider';
import { Module } from '@nestjs/common';

import { FirebaseService } from './firebase.service';

@Module({
  exports: [FirebaseProvider, FirebaseService],
  providers: [DatabaseProvider, ConfigProvider, FirebaseProvider, FirebaseService],
})
export class FirebaseModule {}
