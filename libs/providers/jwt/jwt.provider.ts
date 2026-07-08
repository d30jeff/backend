import { Config } from '@libs/providers/config/config.interface';
import { Jwt } from '@libs/providers/jwt/jwt.interface';
import { Inject, Injectable } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import jwt from 'jsonwebtoken';

@Injectable()
export class JwtProvider {
  constructor(
    @Inject(Config.TOKEN)
    private readonly config: Config.Provider,
  ) { }

  sign(params: Jwt.Sign.Params) {
    const { user } = params;
    return jwt.sign(instanceToPlain(user), this.config.JWT_SECRET, {
      expiresIn: '30d',
    });
  }

  verify(token: string) {
    return jwt.verify(token, this.config.JWT_SECRET);
  }

  decode(token: string) {
    return jwt.decode(token, {
      complete: true,
    });
  }
}
