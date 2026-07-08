import IoRedis from 'ioredis';
export namespace Redis {
  export const TOKEN = 'REDIS_PROVIDER_TOKEN';

  export type Provider = IoRedis;

  export const Keys = {
    LocaleCache: 'LOCALE_CACHE',
    sess: 'sess',
  } as const;

  export type Keys = (typeof Keys)[keyof typeof Keys];

  export type FindParams = {
    type: Keys;
    ID: string;
  };

  export interface CreateParams extends FindParams {
    value: string | object | number;
    ttlInSeconds?: number;
  }

  export type GetTTLParams = FindParams;
  export type DeleteParams = FindParams;
}
