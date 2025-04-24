import { CommonValidationsMap } from './common-validation.interface';
import { Validation, ValidationType } from './validation.interface';

interface StringLengthValidation
  extends Validation<{
    min: number;
    max: number;
  }> {}

type StringValidationMap = CommonValidationsMap & {
  length?: StringLengthValidation;
};

type StringValidation<
  Keys extends keyof StringValidationMap = keyof CommonValidationsMap
> = ValidationType<StringValidationMap, Keys>;

export type { StringValidation };
