import { CommonValidationsMap } from './common-validation.interface';
import { Validation, ValidationType } from './validation.interface';

interface UrlPatternValidation
  extends Validation<{
    pattern: RegExp;
  }> {}

interface UrlProtocolValidation
  extends Validation<{
    allowedProtocols?: string[];
  }> {}

type UrlValidationMap = CommonValidationsMap & {
  pattern?: UrlPatternValidation;
  protocol?: UrlProtocolValidation;
};

type UrlValidation<
  Keys extends keyof UrlValidationMap = keyof CommonValidationsMap
> = ValidationType<UrlValidationMap, Keys>;

export type { UrlValidation };
