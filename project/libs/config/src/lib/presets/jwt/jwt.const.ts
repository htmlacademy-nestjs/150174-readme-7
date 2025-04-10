import { JwtConfig } from './jwt.interface';

const JwtConfigErrorMessages: Record<keyof JwtConfig, string> = {
  tokenSecret: 'Token secret must be a string',
  tokenExpiration: 'Token expiration must be a string',
};

export { JwtConfigErrorMessages };
