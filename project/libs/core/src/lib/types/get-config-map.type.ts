import { PlainObject } from './plain-object.type';

export type GetConfigMap<
  Namespace extends string,
  Config extends PlainObject
> = {
  [Key in keyof Config as Key extends string
    ? `${Namespace}.${Key}`
    : never]: Config[Key];
};
