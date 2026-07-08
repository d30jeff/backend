export type WithOptionalID<T> = Omit<T, 'ID'> & { ID?: string };
