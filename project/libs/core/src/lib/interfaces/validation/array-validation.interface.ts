import { CommonValidationsMap } from './common-validation.interface';
import { Validation, ValidationType } from './validation.interface';

interface ArrayLengthValidation
  extends Validation<{
    min: number;
    max: number;
  }> {}

type ArrayValidationMap = CommonValidationsMap & {
  size?: ArrayLengthValidation;
};

type ArrayValidation<
  Keys extends keyof ArrayValidationMap = keyof CommonValidationsMap
> = ValidationType<ArrayValidationMap, Keys>;

export type { ArrayValidation };
