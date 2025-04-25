import {
  EmailValidation,
  StringValidation,
  UrlValidation,
} from '@avylando-readme/core';

type UserConstraints = {
  email: EmailValidation;
  firstName: StringValidation<'validType' | 'length'>;
  lastName: StringValidation<'validType' | 'length'>;
  password: StringValidation<'validType' | 'length'>;
  avatarSrc: UrlValidation<'validType'>;
};

export type { UserConstraints };
