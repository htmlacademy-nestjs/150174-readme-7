const CreateUserValidationMessage = {
  email: 'Invalid email',
  firstName: 'Invalid first name',
  lastName: 'Invalid last name',
  avatarSrc: 'Invalid avatar source',
  password: 'Password must be a strong password',
};

const LoginUserValidationMessage = {
  email: 'Email must be a valid email',
  password: 'Password must be a string',
};

export { CreateUserValidationMessage, LoginUserValidationMessage };
