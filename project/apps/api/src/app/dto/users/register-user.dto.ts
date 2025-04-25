import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmpty, IsOptional } from 'class-validator';
import { CreateUserDto } from '@project/authentication';

export class RegisterUserApiDto extends CreateUserDto {
  @IsEmpty()
  public avatarSrc?: undefined;

  @ApiProperty({
    description: 'User avatar',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  @Expose()
  public avatar?: Express.Multer.File;
}
