import { JwtTokenPayload } from './jwt-payload.interface';

interface RefreshTokenPayload extends JwtTokenPayload {
  tokenId: string;
}

export type { RefreshTokenPayload };
