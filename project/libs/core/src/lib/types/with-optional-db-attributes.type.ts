import { DbAttributes } from '../interfaces/base/db-attributes.interface';

type WithOptionalDbAttributes<T> = T extends DbAttributes
  ? Pick<Partial<T>, keyof DbAttributes> & Omit<T, keyof DbAttributes>
  : T & Partial<DbAttributes>;

export type { WithOptionalDbAttributes };
