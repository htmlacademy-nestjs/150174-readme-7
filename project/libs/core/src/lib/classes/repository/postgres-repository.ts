import { PrismaClient } from '@prisma/client';

import { Repository } from './repository.interface';
import {
  StorableEntity,
  StorablePlainObject,
} from '../../interfaces/base/storable-entity.interface';
import { EntityFactory } from '../../interfaces/base/entity-factory.interface';
import { WithOptionalId } from '../../types/with-optional-id.type';

export abstract class PostgresRepository<
  T extends StorableEntity<StorablePlainObject<T>>,
  DocumentType extends StorablePlainObject<T> = StorablePlainObject<T>
> implements Repository<T>
{
  constructor(
    protected entityFactory: EntityFactory<T>,
    protected readonly client: PrismaClient
  ) {}

  protected createEntityFromDocument(document: DocumentType): T {
    return this.entityFactory.create(document);
  }

  public async findById(id: T['id']): Promise<T> {
    throw new Error('Not implemented');
  }

  public async save(entity: WithOptionalId<T>): Promise<T> {
    throw new Error('Not implemented');
  }

  public async update(entity: T): Promise<T> {
    throw new Error('Not implemented');
  }

  public async deleteById(id: T['id']): Promise<void> {
    throw new Error('Not implemented');
  }
}
