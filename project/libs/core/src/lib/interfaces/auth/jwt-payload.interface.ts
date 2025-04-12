import { User } from '../user/user.interface';

type JwtTokenPayload = Pick<
  User,
  'email' | 'firstName' | 'lastName' | 'role'
> & {
  sub: string;
};

export type { JwtTokenPayload };
