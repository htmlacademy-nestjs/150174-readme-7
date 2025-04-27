import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { ApiUserValidation } from './dto-validation.const';
import { WritableUser } from '@avylando-readme/core';

export class RegisterUserApiDto implements WritableUser {
  @ApiProperty({
    description: 'User email',
    type: 'string',
    example: 'example@mail.com',
  })
  @IsEmail({}, { message: ApiUserValidation.email.validType.message })
  @Expose()
  public email: WritableUser['email'];

  @ApiProperty({
    description: 'User first name',
    type: 'string',
    example: 'John',
  })
  @IsString({ message: ApiUserValidation.firstName.validType.message })
  @Length(
    ApiUserValidation.firstName.length.min,
    ApiUserValidation.firstName.length.max,
    { message: ApiUserValidation.firstName.length.message }
  )
  @Expose()
  public firstName: WritableUser['firstName'];

  @ApiProperty({
    description: 'User last name',
    type: 'string',
    example: 'Doe',
  })
  @IsString({ message: ApiUserValidation.lastName.validType.message })
  @Length(
    ApiUserValidation.lastName.length.min,
    ApiUserValidation.lastName.length.max,
    { message: ApiUserValidation.lastName.length.message }
  )
  @Expose()
  public lastName: WritableUser['lastName'];

  @ApiProperty({
    description: 'User password',
    type: 'string',
    example: 'password',
  })
  @IsStrongPassword(
    {},
    { message: ApiUserValidation.password.validType.message }
  )
  @Length(
    ApiUserValidation.password.length.min,
    ApiUserValidation.password.length.max,
    { message: ApiUserValidation.password.length.message }
  )
  @Expose()
  public password: string;

  @ApiProperty({
    description: 'User avatar',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  @Expose()
  public avatar?: Express.Multer.File;
}
