import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { AccountConfigNamespace } from './account-config.constants';

export async function getJwtOptions(
  configService: ConfigService
): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>(
      `${AccountConfigNamespace.JWT}.tokenSecret`
    ),
    signOptions: {
      expiresIn: configService.get<string>(
        `${AccountConfigNamespace.JWT}.tokenExpiration`
      ),
      algorithm: 'HS256',
    },
  };
}
