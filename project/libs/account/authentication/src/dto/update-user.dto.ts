import { User, WithRequiredEntityAttributes } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsUrl } from 'class-validator';
import { UpdateUserValidationMessage } from './dto-validations.const';
import { BlogUserEntity } from '@project/blog-user';

export class UpdateUserDto
  implements
    Omit<WithRequiredEntityAttributes<BlogUserEntity>, 'role' | 'passwordHash'>
{
  @ApiProperty({
    description: 'User id',
    type: 'string',
    example: '1234567890abcdef12345678',
  })
  @IsString({ message: 'Id required' })
  public id: string;

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
  @IsUrl(
    { require_host: false, require_protocol: false, require_port: false },
    { message: UpdateUserValidationMessage.avatar }
  )
  @IsOptional()
  @Expose()
  public avatarSrc?: string;
}
