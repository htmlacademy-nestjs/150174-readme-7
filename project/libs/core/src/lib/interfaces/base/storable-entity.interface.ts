import { PlainObject } from '../../types/plain-object.type';
import { WithOptionalId } from '../../types/with-optional-id.type';
import { BaseEntity } from './base-entity.interface';

export interface StorableEntity<T extends PlainObject>
  extends WithOptionalId<BaseEntity> {
  toPlainObject(): T;
}

export type StorablePlainObject<T extends StorableEntity<any>> =
  T extends StorableEntity<infer R> ? R : never;
