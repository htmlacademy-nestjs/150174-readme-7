import { User } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateUserDto
  implements Omit<User, 'id' | 'role' | 'passwordHash'>
{
  @ApiProperty({
    description: 'User email',
    type: 'string',
    example: 'example@mail.com',
  })
  @Expose()
  public email: User['email'];

  @ApiProperty({
    description: 'User first name',
    type: 'string',
    example: 'John',
  })
  @Expose()
  public firstName: User['firstName'];

  @ApiProperty({
    description: 'User last name',
    type: 'string',
    example: 'Doe',
  })
  @Expose()
  public lastName: User['lastName'];

  @ApiProperty({
    description: 'User avatar source',
    type: 'string',
    example: '/avatars/avatar.png',
  })
  @Expose()
  public avatarSrc: User['avatarSrc'];

  @ApiProperty({
    description: 'User password',
    type: 'string',
    example: 'password',
  })
  @Expose()
  public password: string;
}
