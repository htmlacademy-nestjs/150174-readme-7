import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from '../strategies/strategies.const';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalAuthGuard extends AuthGuard(JwtStrategy.local) {}
