import { JwtConfig } from './jwt.interface';

const JwtConfigErrorMessages: Record<keyof JwtConfig, string> = {
  accessTokenSecret: 'Access token secret must be a string',
  accessTokenExpiration: 'Access token expiration must be a string',
  refreshTokenSecret: 'Refresh token secret must be a string',
  refreshTokenExpiration: 'Refresh token expiration must be a string',
};

export { JwtConfigErrorMessages };
