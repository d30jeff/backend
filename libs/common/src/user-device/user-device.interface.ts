import { User } from '@libs/common/src/common';
import { IsDefined } from '@libs/utils/class-validator.util';

export namespace UserDevice {
  export namespace Register {
    export class Payload {
      @IsDefined()
        token: string;
    }

    export type Params = {
      token: string;
      user: User.Response;
    };
  }
}
