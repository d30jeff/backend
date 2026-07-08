import { schema } from '@libs/providers/config/config.provider';
import { CleanedEnv } from 'envalid';

export namespace Config {
  export const TOKEN = 'CONFIG_PROVIDER_TOKEN';

  export type Provider = CleanedEnv<typeof schema>;

}
