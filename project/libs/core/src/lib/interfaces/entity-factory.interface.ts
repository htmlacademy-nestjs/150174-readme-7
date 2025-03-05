import { StorableEntity } from './storable-entity.interface';

export interface EntityFactory<T extends StorableEntity> {
  create(entityPlainData: ReturnType<T['toPlainObject']>): T;
}
