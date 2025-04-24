import {
  FileTypeValidatorOptions,
  MaxFileSizeValidatorOptions,
} from '@nestjs/common';
import { CommonValidationsMap } from './common-validation.interface';
import { Validation, ValidationType } from './validation.interface';

interface FileTypeValidation extends Validation<FileTypeValidatorOptions> {}

interface FileSizeValidation extends Validation<MaxFileSizeValidatorOptions> {}

type FileValidationMap = CommonValidationsMap & {
  size?: FileSizeValidation;
  type?: FileTypeValidation;
};

type FileValidation<
  Keys extends keyof FileValidationMap = keyof CommonValidationsMap
> = ValidationType<FileValidationMap, Keys>;

export type { FileValidation };
