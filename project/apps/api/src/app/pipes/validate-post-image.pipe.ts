import 'multer';
import {
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';
import { ImagePostValidation } from '../dto/blog-posts/create-post/create-image-with-file-post.dto';

export const ValidatePostImagePipe = new ParseFilePipe({
  fileIsRequired: false,
  validators: [
    new MaxFileSizeValidator(ImagePostValidation.image.size),
    new FileTypeValidator(ImagePostValidation.image.type),
  ],
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
});
