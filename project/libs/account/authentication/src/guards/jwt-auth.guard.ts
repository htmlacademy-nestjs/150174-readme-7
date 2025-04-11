import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtStrategy } from '../strategies/strategies.const';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JwtStrategy.accessToken) {}
