import 'multer';
import {
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';
import { ApiUserValidation } from '../dto/users/dto-validation.const';

export const ValidateAvatarImagePipe = new ParseFilePipe({
  fileIsRequired: false,
  validators: [
    new MaxFileSizeValidator(ApiUserValidation.avatar.size),
    new FileTypeValidator(ApiUserValidation.avatar.type),
  ],
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
});
