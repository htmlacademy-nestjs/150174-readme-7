import {
  CanActivate,
  ExecutionContext,
  Inject,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { join } from 'node:path';

import {
  API_SERVICES_PROVIDER_NAME,
  ApiServicesConfig,
} from '@project/api-config';
import { AUTH_CONTROLLER_NAME, AuthEndpoints } from '@project/authentication';
import { JwtTokenPayload } from '@avylando-readme/core';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

export class CheckAuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    @Inject(API_SERVICES_PROVIDER_NAME)
    private readonly services: ApiServicesConfig,
    private reflector: Reflector
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const { data } = await this.httpService.axiosRef.post<JwtTokenPayload>(
        join(this.getAuthenticationServicePath(), AuthEndpoints.CHECK_TOKEN),
        {},
        {
          headers: {
            Authorization: request.headers['authorization'],
          },
        }
      );

      request['user'] = data;
      return true;
    } catch (error) {
      throw new UnauthorizedException('[CheckAuthGuard]: Invalid token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private getAuthenticationServicePath() {
    return join(this.services.accountServiceUri, AUTH_CONTROLLER_NAME);
  }
}
