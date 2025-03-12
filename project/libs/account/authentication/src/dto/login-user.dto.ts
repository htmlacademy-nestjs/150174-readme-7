import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoginUserDto {
  @ApiProperty({
    description: 'User email',
    type: 'string',
    example: 'example@mail.com',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User password',
    type: 'string',
    example: 'password',
  })
  @Expose()
  public password: string;
}
