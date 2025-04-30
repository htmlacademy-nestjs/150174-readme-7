import { WritableUser } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { UserValidation } from './dto-validations.const';

export class CreateUserDto implements WritableUser {
  @ApiProperty({
    description: 'User email',
    type: 'string',
    example: 'example@mail.com',
  })
  @IsEmail({}, { message: UserValidation.email.validType.message })
  @Expose()
  public email: WritableUser['email'];

  @ApiProperty({
    description: 'User first name',
    type: 'string',
    example: 'John',
  })
  @IsString({ message: UserValidation.firstName.validType.message })
  @Length(
    UserValidation.firstName.length.min,
    UserValidation.firstName.length.max,
    { message: UserValidation.firstName.length.message }
  )
  @Expose()
  public firstName: WritableUser['firstName'];

  @ApiProperty({
    description: 'User last name',
    type: 'string',
    example: 'Doe',
  })
  @IsString({ message: UserValidation.lastName.validType.message })
  @Length(
    UserValidation.lastName.length.min,
    UserValidation.lastName.length.max,
    { message: UserValidation.lastName.length.message }
  )
  @Expose()
  public lastName: WritableUser['lastName'];

  @ApiProperty({
    description: 'User password',
    type: 'string',
    example: 'password',
  })
  @IsStrongPassword({}, { message: UserValidation.password.validType.message })
  @Length(
    UserValidation.password.length.min,
    UserValidation.password.length.max,
    { message: UserValidation.password.length.message }
  )
  @Expose()
  public password: string;

  @IsString({ message: UserValidation.avatarSrc.validType.message })
  @IsOptional()
  @Expose()
  public avatarSrc?: WritableUser['avatarSrc'];
}
