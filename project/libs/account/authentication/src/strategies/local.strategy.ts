import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { AuthenticationService } from '../module/authentication.service';
import { BlogUserEntity } from '@project/blog-user';
import { JwtStrategy } from './strategies.const';

const USERNAME_FIELD_NAME = 'email';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  JwtStrategy.local
) {
  constructor(private readonly authService: AuthenticationService) {
    super({ usernameField: USERNAME_FIELD_NAME });
  }

  public async validate(
    email: string,
    password: string
  ): Promise<BlogUserEntity> {
    return this.authService.login({ email, password });
  }
}
