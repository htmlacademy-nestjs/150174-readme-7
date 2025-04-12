import { JwtTokenPayload } from '@avylando-readme/core';

export interface RequestWithTokenPayload {
  user?: JwtTokenPayload;
}
