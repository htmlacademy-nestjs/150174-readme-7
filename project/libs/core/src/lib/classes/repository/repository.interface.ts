import { BaseEntity } from '../../interfaces/base/base-entity.interface';
import { WithOptionalDbAttributes } from '../../types/with-optional-db-attributes.type';
import { WithOptionalId } from '../../types/with-optional-id.type';

export interface Repository<T extends WithOptionalDbAttributes<BaseEntity>> {
  findById(id: T['id']): Promise<T | null>;
  save(entity: WithOptionalDbAttributes<T>): Promise<T>;
  update(entity: T): Promise<T>;
  deleteById(id: T['id']): Promise<void>;
}
