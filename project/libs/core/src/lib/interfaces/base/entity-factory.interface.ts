import {
  StorableEntity,
  StorablePlainObject,
} from './storable-entity.interface';

export interface EntityFactory<
  T extends StorableEntity<StorablePlainObject<T>>
> {
  create(entityPlainData: StorablePlainObject<T>): T;
}
