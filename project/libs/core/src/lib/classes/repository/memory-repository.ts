import { randomUUID } from 'node:crypto';
import {
  StorableEntity,
  StorablePlainObject,
} from '../../interfaces/base/storable-entity.interface';
import { Repository } from './repository.interface';
import { EntityFactory } from '../../interfaces/base/entity-factory.interface';

abstract class MemoryRepository<
  T extends StorableEntity<StorablePlainObject<T>>
> implements Repository<T>
{
  protected entities: Map<T['id'], StorablePlainObject<T>> = new Map();

  constructor(protected entityFactory: EntityFactory<T>) {}

  async save(entity: Omit<T, 'id'>): Promise<T['id']> {
    const createdEntity = Object.assign(entity, { id: randomUUID() });
    this.entities.set(createdEntity.id, createdEntity.toPlainObject());
    return createdEntity.id;
  }

  async update(entity: T): Promise<T> {
    if (!this.entities.has(entity.id)) {
      throw new Error(`Entity with id ${entity.id} not found in repository`);
    }
    this.entities.set(entity.id, entity.toPlainObject());
    return this.entityFactory.create(entity.toPlainObject());
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
