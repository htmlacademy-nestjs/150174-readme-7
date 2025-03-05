import { BaseEntity } from '../../interfaces/base-entity.interface';

export interface Repository<T extends BaseEntity> {
  findById(id: T['id']): Promise<T | null>;
  save(entity: Omit<T, 'id'>): Promise<T['id']>;
  update(entity: T): Promise<T>;
  deleteById(id: T['id']): Promise<void>;
}
