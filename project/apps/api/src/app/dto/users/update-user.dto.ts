import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { UpdateUserDto } from '@project/authentication';

export class UpdateUserApiDto extends UpdateUserDto {
  @ApiProperty({
    description: 'User avatar',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  @Expose()
  public avatar?: Express.Multer.File;
}
