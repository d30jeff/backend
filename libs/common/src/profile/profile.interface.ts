import { Upload } from '@libs/common/src/upload/upload.interface';
import {
  IsIn,
  IsNotEmpty,
  MaxLength,
} from '@libs/utils/class-validator.util';
import { DateTimeUtil } from '@libs/utils/datetime.util';
import { Trim } from '@libs/utils/transformer.util';
import { Expose, Transform } from 'class-transformer';
import { IsISO8601, IsOptional } from 'class-validator';

export namespace Profile {
  export const Gender = {
    Female: 'Female',
    Male: 'Male',
  } as const;

  export type Gender = (typeof Gender)[keyof typeof Gender];

  export class Response {
    @Expose()
    @Trim()
      firstName: string;

    @Expose()
    @Trim()
      lastName: string;

    @Expose()
      gender: Gender;

    @Expose()
    @Transform((field) => {
      return DateTimeUtil.ToUtc(field.value);
    }, { toPlainOnly: true })
      dateOfBirth: string;

    @Expose()
      Upload: Upload.Response;

    @Expose()
    @Transform((field) => {
      return DateTimeUtil.ToUtc(field.value);
    }, { toPlainOnly: true })
      profileCompletedAt: string | null;

    @Expose()
    @Transform((field) => {
      return DateTimeUtil.ToUtc(field.value);
    }, { toClassOnly: true })
      updatedAt: string | null;
  }

  export namespace Update {
    export class Payload {
      @IsNotEmpty()
      @Trim()
        firstName: string;

      @IsNotEmpty()
      @Trim()
        lastName: string;

      @IsOptional()
      @MaxLength(100)
        uploadID?: string;

      @IsOptional()
      @IsIn(Object.values(Gender))
        gender?: Gender;

      @IsOptional()
      @IsISO8601()
        dateOfBirth?: string;

    }
    export type Params = Payload & {
      userID: string;
    };
  }
}
