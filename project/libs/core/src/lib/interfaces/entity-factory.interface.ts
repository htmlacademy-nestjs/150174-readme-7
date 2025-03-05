import { StorableEntity } from './storable-entity.interface';

export interface EntityFactory<
  T extends StorableEntity<ReturnType<T['toPlainObject']>>
> {
  create(entityPlainData: ReturnType<T['toPlainObject']>): T;
}
