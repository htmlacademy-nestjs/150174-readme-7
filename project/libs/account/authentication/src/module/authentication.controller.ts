import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import { fillDto, RabbitMqRouting, User } from '@avylando-readme/core';
import { ValidateMongoIdPipe } from '@project/pipes';

import { AuthenticationService } from './authentication.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { UserRdo } from '../rdo/user.rdo';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { NotifyAvatarUploadedDto } from '@project/file-storage-notify';
import {
  AUTH_CONTROLLER_NAME,
  AuthEndpoints,
} from './authentication.constants';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { RequestWithUser } from './request-with-user.interface';

@ApiTags('authentication')
@Controller(AUTH_CONTROLLER_NAME)
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

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
  public async login(@Body() dto: LoginUserDto) {
    const user = await this.authenticationService.login(dto);
    const { accessToken, refreshToken } =
      await this.authenticationService.createUserToken(user.toPlainObject());
    return fillDto(LoggedUserRdo, {
      ...user.toPlainObject(),
      accessToken,
      refreshToken,
    });
  }

  @ApiResponse({ status: HttpStatus.CREATED, description: 'User registered' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already exists',
  })
  @Post(AuthEndpoints.REGISTER)
  public async register(@Body() dto: CreateUserDto): Promise<User> {
    const user = await this.authenticationService.register(dto);
    return fillDto(UserRdo, user.toPlainObject());
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'Find user' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @Get(AuthEndpoints.USER)
  public async findUser(
    @Param('id', ValidateMongoIdPipe) id: string
  ): Promise<User> {
    const user = await this.authenticationService.findUser(id);
    return fillDto(UserRdo, user.toPlainObject());
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'User updated' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @Put(AuthEndpoints.USER)
  public async updateUser(
    @Param('id', ValidateMongoIdPipe) id: string,
    @Body() dto: UpdateUserDto
  ): Promise<User> {
    const user = await this.authenticationService.updateUser(dto);
    return fillDto(UserRdo, user.toPlainObject());
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens',
  })
  public async refreshToken(@Req() { user }: RequestWithUser) {
    if (!user) {
      throw BadRequestException;
    }
    return this.authenticationService.createUserToken(user);
  }

  @RabbitSubscribe({
    exchange: process.env['RABBIT_EXCHANGE'],
    routingKey: RabbitMqRouting.NotifyAvatarUploaded,
    queue: process.env['RABBIT_QUEUE'],
  })
  public async updateUserAvatar(dto: NotifyAvatarUploadedDto) {
    this.authenticationService.updateUser({
      id: dto.userId,
      avatarSrc: dto.path,
    });
  }
}
