import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import {
  fillDto,
  User,
  RequestWithTokenPayload,
  RequestWithLogout,
} from '@avylando-readme/core';
import { ValidateMongoIdPipe } from '@project/pipes';

import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { UserRdo } from '../rdo/user.rdo';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import {
  AUTH_CONTROLLER_NAME,
  AuthEndpoints,
} from './authentication.constants';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { RequestWithUser } from './request-with-user.interface';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@ApiTags('authentication')
@ApiBearerAuth()
@Controller(AUTH_CONTROLLER_NAME)
export class AuthenticationController {
  private readonly logger = new Logger(AuthenticationController.name);

  constructor(private authenticationService: AuthenticationService) {}

  @UseGuards(LocalAuthGuard)
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
  public async login(@Req() { user }: RequestWithUser) {
    if (!user) {
      throw new NotFoundException();
    }
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
  @Put(AuthEndpoints.USER)
  public async updateUser(
    @Param('id', ValidateMongoIdPipe) id: string,
    @Body() dto: UpdateUserDto
  ): Promise<User> {
    const user = await this.authenticationService.updateUser(id, dto);
    return fillDto(UserRdo, user.toPlainObject());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens',
  })
  @UseGuards(JwtRefreshGuard)
  @Post(AuthEndpoints.REFRESH_TOKEN)
  @HttpCode(HttpStatus.OK)
  public async refreshToken(@Req() { user }: RequestWithUser) {
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authenticationService.createUserToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post(AuthEndpoints.CHECK_TOKEN)
  @HttpCode(HttpStatus.OK)
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User logged out',
  })
  @UseGuards(JwtAuthGuard)
  @Post(AuthEndpoints.LOGOUT)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Req() req: RequestWithLogout) {
    return req.logout(() => {});
  }
}
