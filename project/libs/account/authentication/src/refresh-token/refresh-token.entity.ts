import { Entity, JwtToken, StorableEntity } from '@avylando-readme/core';

class RefreshTokenEntity extends Entity implements StorableEntity<JwtToken> {
  public userId: string;
  public expiresIn: Date;
  public tokenId: string;

  constructor(token: JwtToken) {
    super(token);
    this.populate(token);
  }

  public populate(token: JwtToken): void {
    this.userId = token.userId;
    this.expiresIn = token.expiresIn;
    this.tokenId = token.tokenId;
  }

  public toPlainObject(): JwtToken {
    return {
      id: this.id,
      createdAt: this.createdAt,
      userId: this.userId,
      expiresIn: this.expiresIn,
      tokenId: this.tokenId,
    };
  }
}

export { RefreshTokenEntity };
