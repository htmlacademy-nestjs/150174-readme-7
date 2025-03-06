import { User } from '@avylando-readme/core';

export class CreateUserDto implements Omit<User, 'id' | 'role'> {
  public email: string;
  public firstName: string;
  public lastName: string;
  public avatarSrc: string;
  public passwordHash: string;
}
