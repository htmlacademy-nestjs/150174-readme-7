import { randomUUID } from 'node:crypto';
import { StorableEntity } from '../../interfaces/storable-entity.interface';
import { Repository } from './repository.interface';

abstract class MemoryRepository<T extends StorableEntity>
  implements Repository<T>
{
  protected entities: Map<T['id'], ReturnType<T['toPlainObject']>> = new Map();

  async save(entity: Omit<T, 'id'>): Promise<T['id']> {
    const createdEntity = Object.assign(entity, { id: randomUUID() }) as T;
    this.entities.set(
      createdEntity.id,
      createdEntity.toPlainObject() as ReturnType<T['toPlainObject']>
    );
    return createdEntity.id;
  }

  async update(entity: T): Promise<T> {
    if (!this.entities.has(entity.id)) {
      throw new Error(`Entity with id ${entity.id} not found in repository`);
    }
    this.entities.set(
      entity.id,
      entity.toPlainObject() as ReturnType<T['toPlainObject']>
    );
    return entity;
  }

  async findById(id: T['id']): Promise<T | null> {
    if (!this.entities.has(id)) {
      return null;
    }

    return this.entities.get(id) as T;
  }

  async deleteById(id: T['id']): Promise<void> {
    this.entities.delete(id);
  }
}

export { MemoryRepository };
