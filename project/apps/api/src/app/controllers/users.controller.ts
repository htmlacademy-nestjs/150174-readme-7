import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  AUTH_CONTROLLER_NAME,
  AuthEndpoints,
  LoginUserDto,
  UpdateUserDto,
  UserRdo,
} from '@project/authentication';
import {
  API_SERVICES_PROVIDER_NAME,
  ApiServicesConfig,
} from '@project/api-config';
import { join } from 'node:path';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { RegisterUserDto } from '../dto/register-user.dto';
import { ApiNotifyService } from '@project/api-notify';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { AuthTokens, buildURI, RabbitMqRouting } from '@avylando-readme/core';
import { NotifyAvatarUploadedDto } from '@project/file-storage-notify';
import { ValidateMongoIdPipe } from '@project/pipes';

@Controller('users')
export class UsersController {
  constructor(
    private readonly httpService: HttpService,
    @Inject(API_SERVICES_PROVIDER_NAME)
    private readonly services: ApiServicesConfig,
    private readonly notifyService: ApiNotifyService
  ) {}

  @ApiResponse({ status: HttpStatus.CREATED, description: 'User logged in' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @Post(AuthEndpoints.LOGIN)
  @HttpCode(HttpStatus.OK)
  public async login(@Body() dto: LoginUserDto): Promise<UserRdo> {
    const { data } = await this.httpService.axiosRef.post<UserRdo>(
      this.getLoginPath(),
      dto
    );
    return data;
  }

  @ApiResponse({ status: HttpStatus.CREATED, description: 'User registered' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already exists',
  })
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data', 'application/json')
  @Post(AuthEndpoints.REGISTER)
  @HttpCode(HttpStatus.CREATED)
  public async register(
    @Body() dto: Omit<RegisterUserDto, 'avatar'>,
    @UploadedFile() avatar?: Express.Multer.File
  ): Promise<UserRdo> {
    const { data } = await this.httpService.axiosRef.post<UserRdo>(
      this.getRegisterPath(),
      dto
    );

    if (avatar) {
      await this.notifyService.uploadUserAvatar({
        userId: data.id,
        file: avatar,
      });
    }

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User data updated',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data', 'application/json')
  @Put(AuthEndpoints.USER)
  public async updateUser(
    @Param('id', ValidateMongoIdPipe) id: string,
    @Body() dto: UpdateUserDto,
    @UploadedFile() avatar?: Express.Multer.File
  ): Promise<UserRdo> {
    const { data } = await this.httpService.axiosRef.put<UserRdo>(
      this.getUserPath(id),
      dto
    );
    if (avatar) {
      await this.notifyService.uploadUserAvatar({
        userId: data.id,
        file: avatar,
      });
    }
    return data;
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'User found' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  @Get(AuthEndpoints.USER)
  public async findUser(
    @Param('id', ValidateMongoIdPipe) id: string,
    @Req() req: Request
  ): Promise<UserRdo> {
    const { data } = await this.httpService.axiosRef.get<UserRdo>(
      this.getUserPath(id),
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );
    return data;
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Token refreshed' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  @Post(AuthEndpoints.REFRESH_TOKEN)
  @HttpCode(HttpStatus.OK)
  public async refreshToken(@Req() req: Request): Promise<AuthTokens> {
    console.log('CALL GATEWAY! refreshToken', req.headers['authorization']);

    const { data } = await this.httpService.axiosRef.post<AuthTokens>(
      this.getRefreshTokenPath(),
      {},
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );
    return data;
  }

  @Post(AuthEndpoints.CHECK_TOKEN)
  @HttpCode(HttpStatus.OK)
  public async checkToken(@Req() req: Request): Promise<UserRdo> {
    const { data } = await this.httpService.axiosRef.post<UserRdo>(
      this.getCheckTokenPath(),
      {},
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );
    return data;
  }

  @RabbitSubscribe({
    exchange: process.env['RABBIT_EXCHANGE'],
    routingKey: RabbitMqRouting.NotifyAvatarUploaded,
    queue: process.env['RABBIT_QUEUE'],
  })
  public async uploadUserAvatar(dto: NotifyAvatarUploadedDto) {
    this.httpService.axiosRef.put(this.getUserPath(dto.userId), {
      id: dto.userId,
      avatarSrc: dto.path,
    });
  }

  private getAuthenticationServicePath() {
    return join(this.services.accountServiceUri, AUTH_CONTROLLER_NAME);
  }

  private getLoginPath() {
    return join(this.getAuthenticationServicePath(), AuthEndpoints.LOGIN);
  }

  private getRegisterPath() {
    return join(this.getAuthenticationServicePath(), AuthEndpoints.REGISTER);
  }

  private getUserPath(userId: string) {
    return buildURI(
      join(this.getAuthenticationServicePath(), AuthEndpoints.USER),
      { pathParams: { id: userId } }
    );
  }

  private getRefreshTokenPath() {
    return join(
      this.getAuthenticationServicePath(),
      AuthEndpoints.REFRESH_TOKEN
    );
  }

  private getCheckTokenPath() {
    return join(this.getAuthenticationServicePath(), AuthEndpoints.CHECK_TOKEN);
  }
}
