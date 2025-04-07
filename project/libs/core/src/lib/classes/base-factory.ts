import { BaseEntity } from '../interfaces/base/base-entity.interface';
import { EntityFactory } from '../interfaces/base/entity-factory.interface';
import { StorableEntity } from '../interfaces/base/storable-entity.interface';
import { WithOptionalDbAttributes } from '../types/with-optional-db-attributes.type';

class BaseFactory<
  Obj extends WithOptionalDbAttributes<BaseEntity>,
  Entity extends StorableEntity<Obj>
> implements EntityFactory<StorableEntity<Obj>>
{
  constructor(private readonly EntityClass: new (data: Obj) => Entity) {}

  public create(object: Obj): Entity {
    return new this.EntityClass(object);
  }
}

export { BaseFactory };
