import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { BlogUserEntity, BlogUserRepository } from '@project/blog-user';

import { LoginUserDto } from '../dto/login-user.dto';
import { AuthError } from './authentication.constants';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(protected readonly blogUserRepository: BlogUserRepository) {}

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

  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const existedUser = await this.blogUserRepository.findByEmail(dto.email);

    if (existedUser) {
      throw new ConflictException(AuthError.USER_EXISTS);
    }
    const user = await new BlogUserEntity({
      ...dto,
      role: 'user',
    }).setPassword(dto.password);

    await this.blogUserRepository.save(user);

    return user;
  }

  public async findUser(id: string): Promise<BlogUserEntity> {
    const user = await this.blogUserRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AuthError.NOT_FOUND);
    }

    return user;
  }
}
