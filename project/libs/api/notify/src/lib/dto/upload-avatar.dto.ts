import 'multer';
import { Expose } from 'class-transformer';
import { IsMongoId, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class UploadAvatarDto {
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

export { UploadAvatarDto };
