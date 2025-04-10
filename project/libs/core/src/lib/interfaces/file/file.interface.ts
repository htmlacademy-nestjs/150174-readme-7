import { WithOptionalDbAttributes } from '../../types/with-optional-db-attributes.type';
import { StoredFile } from './stored-file.interface';

export type File = WithOptionalDbAttributes<StoredFile>;
