import { BaseEntity } from '../base/base-entity.interface';
import { UserRole } from './user-role.type';

interface User extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export type { User };
