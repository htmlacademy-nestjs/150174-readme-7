import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';

import { fillDto, User } from '@avylando-readme/core';

import { AuthenticationService } from './authentication.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { UserRdo } from '../rdo/user.rdo';

@ApiTags('authentication')
@Controller('auth')
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
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const user = await this.authenticationService.login(dto);
    return fillDto(LoggedUserRdo, {
      ...user.toPlainObject(),
      authToken: 'secret',
    });
  }

  @ApiResponse({ status: HttpStatus.CREATED, description: 'User registered' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already exists',
  })
  @Post('register')
  public async register(@Body() dto: CreateUserDto): Promise<User> {
    const user = await this.authenticationService.register(dto);
    return fillDto(UserRdo, user.toPlainObject());
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Find user' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @Get(':id')
  public async findUser(@Param('id') id: string): Promise<User> {
    const user = await this.authenticationService.findUser(id);
    return fillDto(UserRdo, user.toPlainObject());
  }
}
