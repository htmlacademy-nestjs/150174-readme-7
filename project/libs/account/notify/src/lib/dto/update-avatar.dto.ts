import 'multer';
import { Expose } from 'class-transformer';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class UpdateAvatarDto {
  @IsMongoId()
  @Expose()
  userId: string;

  @ApiProperty({
    description: 'User avatar',
    type: 'string',
    format: 'binary',
  })
  @IsString()
  @Expose()
  public file: Express.Multer.File;
}

export { UpdateAvatarDto };
