import { Expose } from 'class-transformer';

export namespace Action {

  // export const { Codes } = AdminAction;
  export const Codes = {
    Create: 'Create',
    Delete: 'Delete',
    Download: 'Download',
    Read: 'Read',
    Transfer: 'Transfer',
    Update: 'Update',
  } as const;

  export type Codes = (typeof Codes)[keyof typeof Codes];

  export class Response {
    @Expose()
      ID: string;

    @Expose()
      name: string;

    @Expose()
      code: Action.Codes;
  }

  export namespace Create {
    export type Params = {
      name: string;
      code: Action.Codes
    };
  }
  export namespace FindOne {
    export type Params = Partial<Create.Params>;
  }
}
