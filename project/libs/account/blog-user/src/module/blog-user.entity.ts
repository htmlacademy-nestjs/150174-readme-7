import { compare, genSalt, hash } from 'bcrypt';
import {
  Entity,
  StorableEntity,
  User,
  UserRole,
  WithOptionalId,
} from '@avylando-readme/core';
import { SALT_ROUNDS } from './blog-user.constants';

class BlogUserEntity extends Entity implements StorableEntity<User> {
  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public avatarSrc!: string;
  public role!: UserRole;
  public passwordHash?: string;

  constructor(user: WithOptionalId<User>) {
    super(user.id);
    this.populate(user);
  }

  private populate(user: WithOptionalId<User>) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.avatarSrc = user.avatarSrc;
    this.role = user.role;
    this.passwordHash = user.passwordHash;
  }

  public toPlainObject(): User {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      avatarSrc: this.avatarSrc,
      role: this.role,
      passwordHash: this.passwordHash,
    };
  }

  public async setPassword(password: string) {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}

export { BlogUserEntity };
