import { randomUUID } from 'node:crypto';
import { JwtTokenPayload } from '../interfaces/auth/jwt-payload.interface';
import { RefreshTokenPayload } from '../interfaces/auth/refresh-token-payload.interface';
import { User } from '../interfaces/user/user.interface';

export function createJWTPayload(user: User): JwtTokenPayload {
  return {
    sub: user.id as string,
    email: user.email,
    role: user.role,
    lastName: user.lastName,
    firstName: user.firstName,
  };
}

export function createRefreshJWTPayload(user: User): RefreshTokenPayload {
  return {
    ...createJWTPayload(user),
    tokenId: randomUUID(),
  };
}
