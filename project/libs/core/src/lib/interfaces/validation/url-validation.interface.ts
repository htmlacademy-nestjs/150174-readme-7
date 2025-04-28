import { CommonValidationsMap } from './common-validation.interface';
import { ValidationType } from './validation.interface';
import type { IsURLOptions } from 'validator/lib/isURL';

type UrlValidationMap = CommonValidationsMap;

type UrlValidation<
  Keys extends keyof UrlValidationMap = keyof UrlValidationMap
> = ValidationType<UrlValidationMap, Keys> & { urlOptions?: IsURLOptions };

export type { UrlValidation };
