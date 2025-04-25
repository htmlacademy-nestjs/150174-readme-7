import { CommonValidationsMap } from './common-validation.interface';
import { ValidationType } from './validation.interface';

type EmailValidationMap = CommonValidationsMap;

type EmailValidation<
  Keys extends keyof EmailValidationMap = keyof CommonValidationsMap
> = ValidationType<EmailValidationMap, Keys>;

export type { EmailValidation };
