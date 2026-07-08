import { Locale } from '@libs/common/src/locale/locale.interface';
import { IsIn } from '@libs/utils/class-validator.util';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export namespace Preference {
  export const Appearance = {
    Dark: 'Dark',
    Light: 'Light',
    System: 'System',
  } as const;

  export type Appearance = (typeof Appearance)[keyof typeof Appearance];

  export class Response {
    @Expose()
      Locale: Locale.Response;

    @Expose()

      appearance: Preference.Appearance;

    @Expose()

      setAt: string;

  }

  export namespace Update {
    export class Payload {
      @IsOptional()
      @IsIn(Object.values(Appearance))
        appearance: Appearance;

      @IsOptional()
      @IsIn(Object.values(Locale.Codes))
        locale: Locale.Codes;
    }

    export type Params = Payload & {
      userID: string;
    };
  }
}
