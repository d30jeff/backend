import { NotFoundException } from '@libs/exceptions/http-exception';
import { System } from '@libs/interfaces/system/system.interface';
import { IsDefined, MaxLength } from '@libs/utils/class-validator.util';
import { Expose } from 'class-transformer';
import { Max } from 'class-validator';

export namespace Upload {
  // FIXME: Fix size
  export const MAX_UPLOAD_SIZE_IN_BYTES = Math.pow(1024, 2) * 10;

  export class Response {
    @Expose()
      ID: string;

    @Expose()
      key: string;

    @Expose()
      url: string;

    @Expose()
      originalFileName: string;

    @Expose()
      sizeInBytes: number;

    @Expose()
      mimetype: string;
  }

  export namespace Exceptions {
    export class NotFound extends NotFoundException {
      constructor() {
        super('Upload not found');
      }
    }
  }

  export namespace Create {

    export class Payload {
      @IsDefined()
      @MaxLength()
        mimetype: string;

      @IsDefined()
      @Max(MAX_UPLOAD_SIZE_IN_BYTES, { context: MAX_UPLOAD_SIZE_IN_BYTES })
        contentLength: number;

      @IsDefined()
      @MaxLength()
        originalFileName: string;
    }

    export type Params = {
      userID: string;
      originalFileName: string;
      contentLength: number;
      mimetype: string;
    };
  }

  export namespace UploadFromUrl {
    export type Params = {
      url: string;
      userID: string;
    };
  }

  export namespace CreateSignedUploadUrl {
    export class Response {
      ID: string;

      key: string;

      url: string;
      constructor(params: Response) {
        this.ID = params.ID;
        this.key = params.key;
        this.url = params.url;
      }
    }

    export class Payload extends Upload.Create.Payload { }
    export type Params = Upload.Create.Params;
  }

  export namespace FindOne {
    export type Params = System.WithAuthenticatedUser<System.Service.FindOne.Params>;
  }

  export namespace GenerateReadUrl {
    export type Params = FindOne.Params;
  }

  export namespace Delete {
    export type Params = System.WithAuthenticatedUser<System.Service.Delete.Params>;
  }
}
