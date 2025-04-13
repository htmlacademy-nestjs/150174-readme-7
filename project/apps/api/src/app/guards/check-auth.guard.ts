import {
  CanActivate,
  ExecutionContext,
  Inject,
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

export class CheckAuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    @Inject(API_SERVICES_PROVIDER_NAME)
    private readonly services: ApiServicesConfig
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { data } = await this.httpService.axiosRef.post<JwtTokenPayload>(
      join(this.getAuthenticationServicePath(), AuthEndpoints.CHECK_TOKEN),
      {},
      {
        headers: {
          Authorization: request.headers['authorization'],
        },
      }
    );

    if (!data) {
      throw new UnauthorizedException();
    }

    request['user'] = data;
    return true;
  }

  private getAuthenticationServicePath() {
    return join(this.services.accountServiceUri, AUTH_CONTROLLER_NAME);
  }
}
