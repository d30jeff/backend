import { ExpressRequest } from '@libs/interfaces/express.interface';

// TODO: can be removed?
export const serializeSortQueries = (request: ExpressRequest) => {
  const sort = request.query.sort as string;

  if (!sort) {
    return null;
  }

  const order = {};

  const providedSortKeys: string[] = Array.isArray(sort) ? sort : [sort];

  for (const providedSortKey of providedSortKeys) {
    const [key, value] = providedSortKey.split('.');

    if (!key || !value) {
      continue;
    }

    order[key] = value;
  }

  return order;
};
