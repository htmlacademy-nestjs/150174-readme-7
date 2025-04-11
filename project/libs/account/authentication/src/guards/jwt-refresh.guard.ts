import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from '../strategies/strategies.const';

export class JwtRefreshGuard extends AuthGuard(JwtStrategy.refreshToken) {}
