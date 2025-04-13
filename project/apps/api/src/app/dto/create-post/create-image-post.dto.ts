import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateImagePostDto {
  @ApiProperty({
    description: 'Post image',
    type: 'string',
    format: 'binary',
  })
  @Expose()
  public image: Express.Multer.File;
}
