import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class UploadPostMediaDto {
  @ApiProperty({
    description: 'Post id',
    type: 'string',
  })
  @IsString()
  @Expose()
  public postId: string;

  @ApiProperty({
    description: 'Post media file',
    type: 'string',
    format: 'binary',
  })
  @IsString()
  @Expose()
  public file: Express.Multer.File;
}

export { UploadPostMediaDto };
