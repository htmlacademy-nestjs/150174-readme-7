import { Default__v, Document, Model, ObjectId, Require_id } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

import {
  StorableEntity,
  StorablePlainObject,
} from '../../interfaces/base/storable-entity.interface';
import { Repository } from './repository.interface';
import { EntityFactory } from '../../interfaces/base/entity-factory.interface';
import { WithOptionalDbAttributes } from '../../types/with-optional-db-attributes.type';
import { WithRequiredId } from '../../types/with-required-id.type';
import { WithRequiredEntityAttributes } from '../../types/with-required-entity-attributes.type';

abstract class MongoRepository<
  T extends StorableEntity<StorablePlainObject<T>>,
  DocumentType extends Document<
    ObjectId,
    any,
    Default__v<Require_id<StorablePlainObject<T>>>
  >
> implements Repository<T>
{
  constructor(
    protected entityFactory: EntityFactory<T>,
    protected readonly model: Model<DocumentType>
  ) {}

  protected createEntityFromDocument(document: DocumentType): T {
    const object = document.toObject({
      flattenObjectIds: true,
      virtuals: true,
    });
    return this.entityFactory.create(object);
  }

  public async save(entity: WithOptionalDbAttributes<T>): Promise<T> {
    const newEntity = new this.model(entity.toPlainObject());
    await newEntity.save();
    entity.id = newEntity._id.toString();
    return entity as T;
  }

  public async update(entity: WithRequiredEntityAttributes<T>): Promise<T> {
    const document = await this.model
      .findByIdAndUpdate(entity.id, entity, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!document) {
      throw new NotFoundException(
        `Document with id ${entity.id} not found in Mongo DB`
      );
    }

    return this.createEntityFromDocument(document);
  }

  public async findById(id: T['id']): Promise<T | null> {
    const document = await this.model.findById(id);

    if (!document) {
      throw new NotFoundException(
        `Document with id ${id} not found in Mongo DB`
      );
    }

    return this.createEntityFromDocument(document);
  }

  public async deleteById(id: T['id']): Promise<void> {
    const deletedDocument = await this.model.findByIdAndDelete(id).exec();

    if (!deletedDocument) {
      throw new NotFoundException(
        `Document with id ${id} not found in Mongo DB`
      );
    }
  }
}

export { MongoRepository };
