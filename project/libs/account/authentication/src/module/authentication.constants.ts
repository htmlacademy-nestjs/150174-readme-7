export const AuthError = {
  USER_EXISTS: 'User with this email is already exists',
  NOT_FOUND: 'User not found',
  PASSWORD_WRONG: 'User password is wrong',
};

export const AUTH_CONTROLLER_NAME = 'auth';

export const AuthEndpoints = {
  LOGIN: 'login',
  REGISTER: 'register',
  USER: ':id',
  USER_AVATAR: ':id/avatar',
  REFRESH_TOKEN: 'refresh',
  CHECK_TOKEN: 'check',
} as const;
