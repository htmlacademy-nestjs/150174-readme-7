import { Entity } from '../../classes/entity';
import { UserRole } from './user-role.type';

interface User extends Entity {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export type { User };
