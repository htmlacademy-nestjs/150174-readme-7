import { StorableEntity } from '../interfaces/base/storable-entity.interface';
import { PlainObject } from './plain-object.type';

type WithRequiredEntityAttributes<T extends StorableEntity<PlainObject>> =
  Partial<T> & Pick<StorableEntity, 'id'>;

export { WithRequiredEntityAttributes };
