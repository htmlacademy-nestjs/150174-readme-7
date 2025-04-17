import { User, UserRole } from '@avylando-readme/core';
import { Expose } from 'class-transformer';

export class UserRdo implements User {
  @Expose()
  public id: string;

  @Expose()
  public avatarSrc?: string;

  @Expose()
  public email: string;

  @Expose()
  public firstName: string;

  @Expose()
  public lastName: string;

  @Expose()
  public role: UserRole;

  public createdAt: Date;

  public updatedAt: Date;
}
