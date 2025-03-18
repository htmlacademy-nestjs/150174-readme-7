import { BaseEntity } from '../base/base-entity.interface';
import { UserRole } from './user-role.type';

type User = BaseEntity & {
  firstName: string;
  lastName: string;
  email: string;
  avatarSrc: string;
  role: UserRole;
  passwordHash?: string;
};

export type { User };
