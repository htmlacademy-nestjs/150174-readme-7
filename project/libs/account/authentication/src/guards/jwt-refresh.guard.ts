import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from '../strategies/strategies.const';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtRefreshGuard extends AuthGuard(JwtStrategy.refreshToken) {}
