import { WithOptionalDbAttributes } from '../../types/with-optional-db-attributes.type';
import { UserRole } from './user-role.type';

type User = WithOptionalDbAttributes<{
  firstName: string;
  lastName: string;
  email: string;
  avatarSrc?: string;
  role: UserRole;
  passwordHash?: string;
}>;

type WritableUser = Omit<User, 'role' | 'passwordHash'>;

export type { User, WritableUser };
