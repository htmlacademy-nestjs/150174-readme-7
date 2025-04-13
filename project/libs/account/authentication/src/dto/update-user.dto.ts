import { User, WithRequiredEntityAttributes } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { UpdateUserValidationMessage } from './dto-validations.const';
import { BlogUserEntity } from '@project/blog-user';

export class UpdateUserDto
  implements
    Omit<
      WithRequiredEntityAttributes<BlogUserEntity>,
      'id' | 'role' | 'passwordHash'
    >
{
  @ApiProperty({
    description: 'User first name',
    type: 'string',
    example: 'John',
  })
  @IsString({ message: UpdateUserValidationMessage.firstName })
  @IsOptional()
  @Expose()
  public firstName?: User['firstName'];

  @ApiProperty({
    description: 'User last name',
    type: 'string',
    example: 'Doe',
  })
  @IsString({ message: UpdateUserValidationMessage.lastName })
  @IsOptional()
  @Expose()
  public lastName?: User['lastName'];

  @ApiProperty({
    description: 'User avatar',
    type: 'string',
    example: '/avatar.png',
  })
  @IsString({ message: UpdateUserValidationMessage.avatar })
  @IsOptional()
  @Expose()
  public avatarSrc?: string;
}
