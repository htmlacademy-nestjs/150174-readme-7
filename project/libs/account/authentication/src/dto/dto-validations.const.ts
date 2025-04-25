import { UserConstraints } from './dto-validations.type';

const UserValidation: UserConstraints = {
  email: {
    validType: {
      message: 'Email must be a valid email',
    },
  },
  firstName: {
    validType: {
      message: 'First name must be a string',
    },
    length: {
      message: 'First name must be between 3 and 50 characters',
      min: 3,
      max: 50,
    },
  },
  lastName: {
    validType: {
      message: 'Last name must be a string',
    },
    length: {
      message: 'Last name must be between 3 and 50 characters',
      min: 3,
      max: 50,
    },
  },
  password: {
    validType: {
      message: 'Password must be a strong password',
    },
    length: {
      message: 'Password must be between 8 and 50 characters',
      min: 8,
      max: 50,
    },
  },
  avatarSrc: {
    validType: {
      message: 'Avatar src must be a string',
    },
  },
};

export { UserValidation };
