import 'multer';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidateImagePipe implements PipeTransform<Express.Multer.File> {
  private readonly ALLOWED_MIME_TYPES: string[] = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
  ];

  private readonly MAX_SIZE = 1 * 1024 * 1024; // 1 MB

  transform(value: Express.Multer.File): Express.Multer.File {
    if (!value) {
      throw new BadRequestException('File is required');
    }

    if (!this.validateFileType(value)) {
      throw new BadRequestException(
        `Unsupported file type ${
          value.mimetype
        }. Allowed types: ${this.ALLOWED_MIME_TYPES.join(', ')}`
      );
    }

    if (!this.validateFileSize(value)) {
      throw new BadRequestException(
        `File size exceeds the limit of ${this.MAX_SIZE / 1024} KB`
      );
    }

    return value;
  }

  private validateFileType(file: Express.Multer.File): boolean {
    return this.ALLOWED_MIME_TYPES.includes(file.mimetype);
  }

  private validateFileSize(file: Express.Multer.File): boolean {
    return file.size <= this.MAX_SIZE;
  }
}
