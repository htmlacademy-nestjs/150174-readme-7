import { WithOptionalDbAttributes } from '../../types/with-optional-db-attributes.type';

export type JwtToken = WithOptionalDbAttributes<{
  tokenId: string;
  userId: string;
  expiresIn: Date;
}>;
