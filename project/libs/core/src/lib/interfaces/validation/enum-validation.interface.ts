import { CommonValidationsMap } from './common-validation.interface';
import { Validation, ValidationType } from './validation.interface';

interface EnumTypeValidation
  extends Validation<{
    values: string[];
  }> {}

type EnumValidationMap = CommonValidationsMap & {
  enum: EnumTypeValidation;
};

type EnumValidation<
  Keys extends keyof EnumValidationMap = keyof EnumValidationMap
> = ValidationType<EnumValidationMap, Keys>;

export type { EnumValidation };
