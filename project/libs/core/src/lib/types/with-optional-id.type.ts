import { BaseEntity } from '../interfaces/base/base-entity.interface';

type WithOptionalId<T> = T extends BaseEntity
  ? Pick<Partial<T>, 'id'> & Omit<T, 'id'>
  : never;

export type { WithOptionalId };
