import { Entity, StorableEntity, User, UserRole } from '@avylando-readme/core';

class BlogUserEntity extends Entity implements StorableEntity<User> {
  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public avatarSrc!: string;
  public role!: UserRole;
  public passwordHash!: string;

  constructor(user: User) {
    super();
    this.populate(user);
  }

  private populate(user: User) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.avatarSrc = user.avatarSrc;
    this.role = user.role;
    this.passwordHash = user.passwordHash;
  }

  toPlainObject(): User {
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
}

export { BlogUserEntity };
