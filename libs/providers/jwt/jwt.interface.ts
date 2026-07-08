import { User } from '@libs/common/src/user/user.interface';

export namespace Jwt {
  export namespace Sign {
    export type Params = {
      user: User.Response;
    };
  }
}
