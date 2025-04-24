import 'multer';
import {
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';
import { ImagePostValidation } from '../dto/create-post/create-image-post.dto';

export const ValidatePostImagePipe = new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator(ImagePostValidation.image.size),
    new FileTypeValidator(ImagePostValidation.image.type),
  ],
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
});
