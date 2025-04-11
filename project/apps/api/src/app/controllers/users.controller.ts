import { HttpService } from '@nestjs/axios';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LoginUserDto } from '@project/authentication';
import {
  API_SERVICES_PROVIDER_NAME,
  ApiServicesConfig,
} from '@project/api-config';

@Controller('users')
export class UsersController {
  constructor(
    private readonly httpService: HttpService,
    @Inject(API_SERVICES_PROVIDER_NAME)
    private readonly services: ApiServicesConfig
  ) {}

  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${this.services.accountServiceUri}/auth/login`,
      dto
    );
    return data;
  }
}
