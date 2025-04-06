import { EntityFactory } from '../interfaces/base/entity-factory.interface';
import { StorableEntity } from '../interfaces/base/storable-entity.interface';
import { PlainObject } from '../types/plain-object.type';
import { WithOptionalId } from '../types/with-optional-id.type';

class BaseFactory<Obj extends PlainObject, Entity extends StorableEntity<Obj>>
  implements EntityFactory<StorableEntity<Obj>>
{
  constructor(
    private readonly EntityClass: new (data: WithOptionalId<Obj>) => Entity
  ) {}

  public create(comment: WithOptionalId<StorableEntity<Obj>>): Entity {
    return new this.EntityClass(comment);
  }
}

export { BaseFactory };
