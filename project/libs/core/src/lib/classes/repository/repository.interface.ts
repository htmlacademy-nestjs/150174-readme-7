import { BaseEntity } from '../../interfaces/base/base-entity.interface';
import { WithOptionalId } from '../../types/with-optional-id.type';

export interface Repository<T extends WithOptionalId<BaseEntity>> {
  findById(id: T['id']): Promise<T | null>;
  save(entity: Omit<T, 'id'>): Promise<T>;
  update(entity: T): Promise<T>;
  deleteById(id: T['id']): Promise<void>;
}
