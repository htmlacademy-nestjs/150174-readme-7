import { Validation } from './validation.interface';

interface ValidTypeValidation extends Validation<{}> {}

type CommonValidationsMap = {
  validType: ValidTypeValidation;
};

export type { CommonValidationsMap };
