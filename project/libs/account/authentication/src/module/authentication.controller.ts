import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { User } from '@avylando-readme/core';

import { AuthenticationService } from './authentication.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('login')
  public async login(@Body() dto: LoginUserDto): Promise<User> {
    const user = await this.authenticationService.login(dto);
    return user.toPlainObject();
  }

  @Post('register')
  public async register(@Body() dto: CreateUserDto): Promise<User> {
    const user = await this.authenticationService.register(dto);
    return user.toPlainObject();
  }

  @Get(':id')
  public async findUser(@Param('id') id: string): Promise<User> {
    const user = await this.authenticationService.findUser(id);
    console.log(user);
    return user.toPlainObject();
  }
}
