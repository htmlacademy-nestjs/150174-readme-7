import { PlainObject } from '../types/base/plain-object.type';
import { BaseEntity } from './base-entity.interface';

export interface StorableEntity<T extends PlainObject = PlainObject>
  extends BaseEntity {
  toPlainObject(): T;
}
