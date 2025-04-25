import { StringValidation } from '@avylando-readme/core';

export type CommentConstraints = {
  authorId: StringValidation<'validType'>;
  content: StringValidation<'validType' | 'length'>;
};
