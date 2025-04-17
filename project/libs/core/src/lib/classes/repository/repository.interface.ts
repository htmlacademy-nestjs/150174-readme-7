import { BaseEntity } from '../../interfaces/base/base-entity.interface';
import { StorableEntity } from '../../interfaces/base/storable-entity.interface';
import { WithOptionalDbAttributes } from '../../types/with-optional-db-attributes.type';
import { WithRequiredEntityAttributes } from '../../types/with-required-entity-attributes.type';

export interface Repository<
  T extends WithOptionalDbAttributes<StorableEntity>
> {
  findById(id: T['id']): Promise<T | null>;
  save(entity: WithOptionalDbAttributes<T>): Promise<T>;
  update(entity: WithRequiredEntityAttributes<T>): Promise<T>;
  deleteById(id: T['id']): Promise<void>;
}
