import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import {
  BlogUserEntity,
  BlogUserFactory,
  BlogUserRepository,
} from '@project/blog-user';
import { AccountNotifyService } from '@project/account-notify';

import { LoginUserDto } from '../dto/login-user.dto';
import { AuthError } from './authentication.constants';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtToken, JwtTokenPayload, User } from '@avylando-readme/core';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class AuthenticationService {
  private logger = new Logger(AuthenticationService.name);

  constructor(
    protected readonly blogUserRepository: BlogUserRepository,
    protected readonly blogUserFactory: BlogUserFactory,
    protected readonly jwtService: JwtService,
    protected readonly notifyService: AccountNotifyService
  ) {}

  public async login(dto: LoginUserDto): Promise<BlogUserEntity> {
    const { email, password } = dto;
    const user = await this.blogUserRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(AuthError.NOT_FOUND);
    }

    if (!(await user.comparePassword(password))) {
      throw new UnauthorizedException(AuthError.PASSWORD_WRONG);
    }

    return user;
  }

  public async register(
    dto: CreateUserDto,
    avatar?: Express.Multer.File
  ): Promise<BlogUserEntity> {
    const existedUser = await this.blogUserRepository.findByEmail(dto.email);

    if (existedUser) {
      throw new ConflictException(AuthError.USER_EXISTS);
    }
    const user = await this.blogUserFactory
      .create({
        ...dto,
        role: 'user',
      })
      .setPassword(dto.password);

    const createdUser = await this.blogUserRepository.save(user);
    await this.notifyService.registerSubscriber(createdUser.toPlainObject());

    if (avatar) {
      await this.notifyService.updateUserAvatar({
        userId: createdUser.id as string,
        file: avatar,
      });
    }

    return user;
  }

  public async findUser(id: string): Promise<BlogUserEntity> {
    const user = await this.blogUserRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AuthError.NOT_FOUND);
    }

    return user;
  }

  public async createUserToken(user: User): Promise<JwtToken> {
    const payload: JwtTokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      lastName: user.lastName,
      firstName: user.firstName,
    };

    try {
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException(
        'Ошибка при создании токена.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async updateUser(dto: UpdateUserDto): Promise<BlogUserEntity> {
    const user = await this.blogUserRepository.update(dto);

    return user;
  }
}
