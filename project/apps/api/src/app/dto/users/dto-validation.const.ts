import { FileValidation } from '@avylando-readme/core';
import { UserConstraints, UserValidation } from '@project/authentication';

type ApiUserConstraints = Omit<UserConstraints, 'avatarSrc'> & {
  avatar: FileValidation<'validType' | 'size' | 'type'>;
};

export const ApiUserValidation: ApiUserConstraints = {
  ...UserValidation,
  avatar: {
    validType: {
      message: 'Avatar src must be a string',
    },
    size: {
      message: 'Avatar size must be 500KB maximum',
      maxSize: 0.5 * 1024 * 1024, // 500kb
    },
    type: {
      message: 'Avatar type must be jpeg or png',
      fileType: /(image\/jpeg|image\/png)/,
    },
  },
};
