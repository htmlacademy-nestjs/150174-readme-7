import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { CreateUserDto } from '@project/authentication';

export class RegisterUserDto extends CreateUserDto {
  @ApiProperty({
    description: 'User avatar',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  @Expose()
  public avatar?: Express.Multer.File;
}
