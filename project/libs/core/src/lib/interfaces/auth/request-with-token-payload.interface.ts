import { JwtTokenPayload } from './jwt-payload.interface';

export interface RequestWithTokenPayload {
  user: JwtTokenPayload;
}
