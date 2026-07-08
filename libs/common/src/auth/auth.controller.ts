import { Public } from '@libs/common/src/auth/auth.decorator';
import { Auth } from '@libs/common/src/auth/auth.interface';
import { AuthService } from '@libs/common/src/auth/auth.service';
import { Common } from '@libs/common/src/common.interface';
import { UserResponse } from '@libs/common/src/user/user.response';
import { HttpStatus } from '@libs/enums/http-status.enum';
import type { ExpressRequest, ExpressResponse } from '@libs/interfaces/express.interface';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Inject,
  Post,
  Request,
  Response,
} from '@nestjs/common';

@Controller('/auth')
@Public()
export class AuthController {
  constructor(
    @Inject(Auth.TOKEN) private readonly options: Auth.ModuleOptions,
    @Inject(Common.Provider) private readonly common: Common.ModuleOptions,
    private readonly authService: AuthService,
  ) {}

  @Post('/sign-up')
  signUp() {
    if (!this.options.allowSignUp) {
      throw new Auth.Exceptions.SignUpForbidden();
    }

    // TODO: Check if sign up is allowed
  }

  @Post('/sign-in/provider')
  @HttpCode(HttpStatus.Ok)
  async signInWithProvider(
    @Body() body: Auth.SignInWithProvider.Payload,
    @Request() request: ExpressRequest,
  ) {
    const data = await this.authService.signInWithFirebase({
      ...body,
      moduleCode: this.common.module,
    });

    const userResponse = await UserResponse(data, [this.common.module]);

    request.session.user = userResponse;

    return userResponse;
  }

  @Delete('/sign-out')
  async signOut(@Request() request: ExpressRequest, @Response() response: ExpressResponse) {
    request.session.destroy(() => {
      return response.sendStatus(HttpStatus.NoContent);
    });
  }
}
