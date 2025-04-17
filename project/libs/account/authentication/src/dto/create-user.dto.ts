import { User, WithOptionalDbAttributes } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { CreateUserValidationMessage } from './dto-validations.const';

export class CreateUserDto
  implements
    Omit<WithOptionalDbAttributes<User>, 'role' | 'passwordHash' | 'avatarSrc'>
{
  @ApiProperty({
    description: 'User email',
    type: 'string',
    example: 'example@mail.com',
  })
  @IsEmail({}, { message: CreateUserValidationMessage.email })
  @Expose()
  public email: User['email'];

  @ApiProperty({
    description: 'User first name',
    type: 'string',
    example: 'John',
  })
  @IsString({ message: CreateUserValidationMessage.firstName })
  @Expose()
  public firstName: User['firstName'];

  @ApiProperty({
    description: 'User last name',
    type: 'string',
    example: 'Doe',
  })
  @IsString({ message: CreateUserValidationMessage.lastName })
  @Expose()
  public lastName: User['lastName'];

  @ApiProperty({
    description: 'User password',
    type: 'string',
    example: 'password',
  })
  @IsStrongPassword({}, { message: CreateUserValidationMessage.password })
  @Expose()
  public password: string;
}
