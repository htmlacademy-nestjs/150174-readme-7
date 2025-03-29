import { UserRole } from '../user/user-role.type';

interface JwtTokenPayload {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export type { JwtTokenPayload };
