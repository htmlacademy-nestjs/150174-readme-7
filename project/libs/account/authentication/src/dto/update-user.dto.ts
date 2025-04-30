import { WritableUser } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString, Length } from 'class-validator';
import { UserValidation } from './dto-validations.const';

export class UpdateUserDto implements Partial<WritableUser> {
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
  @IsOptional()
  @Expose()
  public firstName?: WritableUser['firstName'];

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
  @IsOptional()
  @Expose()
  public lastName?: WritableUser['lastName'];

  @ApiProperty({
    description: 'User avatar',
    type: 'string',
    example: '/avatar.png',
  })
  @IsString({ message: UserValidation.avatarSrc.validType.message })
  @IsOptional()
  @Expose()
  public avatarSrc?: string;
}
