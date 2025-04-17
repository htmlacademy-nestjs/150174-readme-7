import { PlainObject } from '../../types/plain-object.type';
import { WithOptionalDbAttributes } from '../../types/with-optional-db-attributes.type';
import { BaseEntity } from './base-entity.interface';

export interface StorableEntity<T extends PlainObject = PlainObject>
  extends WithOptionalDbAttributes<BaseEntity> {
  toPlainObject(): T;
}

export type StorablePlainObject<T extends StorableEntity<any>> =
  T extends StorableEntity<infer R> ? R : never;
