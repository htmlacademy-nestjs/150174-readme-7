const CreateUserValidationMessage = {
  email: 'Invalid email',
  firstName: 'Invalid first name',
  lastName: 'Invalid last name',
  password: 'Password must be a strong password',
  avatar: 'Invalid avatar file',
};

const UpdateUserValidationMessage = CreateUserValidationMessage;

const LoginUserValidationMessage = {
  email: 'Email must be a valid email',
  password: 'Password must be a string',
};

export {
  CreateUserValidationMessage,
  LoginUserValidationMessage,
  UpdateUserValidationMessage,
};
