import { FileValidation } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

interface ImagePostConstraints {
  image: FileValidation<'validType' | 'size' | 'type'>;
}

export const ImagePostValidation: ImagePostConstraints = {
  image: {
    validType: {
      message: 'Image must be a valid file',
    },
    size: {
      maxSize: 1 * 1024 * 1024, // 1MB
      message: 'Image size should be less than 1MB',
    },
    type: {
      fileType: /(image\/jpeg|image\/png)/,
      message: 'Image should be in JPEG or PNG format',
    },
  },
};

export class CreateImageWithFilePostDto {
  @ApiProperty({
    description: 'Image file',
    type: 'string',
    format: 'binary',
  })
  @Expose()
  public image: Express.Multer.File;
}
