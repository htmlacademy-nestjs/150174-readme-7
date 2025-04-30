import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  AUTH_CONTROLLER_NAME,
  AuthEndpoints,
  CreateUserDto,
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
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterUserApiDto } from '../dto/users/register-user.dto';
import { UpdateUserApiDto } from '../dto/users/update-user.dto';
import { AuthTokens, buildURI } from '@avylando-readme/core';
import { ValidateMongoIdPipe } from '@project/pipes';
import { Public } from '../decorators/public.decorator';
import { UserService } from '../services/user.service';
import { ValidateAvatarImagePipe } from '../pipes/validate-avatar-image.pipe';

@Controller('users')
@ApiTags('account')
@ApiBearerAuth('JWT')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

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

  private getLogoutPath() {
    return join(this.getAuthenticationServicePath(), AuthEndpoints.LOGOUT);
  }

  constructor(
    private readonly httpService: HttpService,
    @Inject(API_SERVICES_PROVIDER_NAME)
    private readonly services: ApiServicesConfig,
    private readonly userService: UserService
  ) {}

  @Public()
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

  @Public()
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
    @Body() dto: RegisterUserApiDto,
    @UploadedFile(ValidateAvatarImagePipe) avatar?: Express.Multer.File
  ): Promise<UserRdo> {
    let userData: CreateUserDto = dto;
    if (avatar) {
      const userAssetsData = await this.userService.handleUserAssets(avatar);
      userData = {
        ...dto,
        ...userAssetsData,
      };

      this.logger.log(
        `Avatar uploaded successfully: ${userAssetsData.avatarSrc}`
      );
    }

    const { data } = await this.httpService.axiosRef.post<UserRdo>(
      this.getRegisterPath(),
      userData
    );

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
    @Body() dto: UpdateUserApiDto,
    @UploadedFile(ValidateAvatarImagePipe) avatar?: Express.Multer.File
  ): Promise<UserRdo> {
    let userData: UpdateUserDto = dto;
    if (avatar) {
      const userAssetsData = await this.userService.handleUserAssets(avatar);
      userData = {
        ...dto,
        ...userAssetsData,
      };
      this.logger.log(
        `Avatar uploaded successfully: ${userAssetsData.avatarSrc}`
      );
    }

    const { data } = await this.httpService.axiosRef.put<UserRdo>(
      this.getUserPath(id),
      userData
    );

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

  @Public()
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

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User logged out',
  })
  @Post(AuthEndpoints.LOGOUT)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Req() req: Request): Promise<void> {
    await this.httpService.axiosRef.post<void>(
      this.getLogoutPath(),
      {},
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );
  }
}
