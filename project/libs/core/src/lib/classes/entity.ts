import { BaseEntity } from '../interfaces/base/base-entity.interface';
import { DbAttributes } from '../interfaces/base/db-attributes.interface';
import { WithOptionalDbAttributes } from '../types/with-optional-db-attributes.type';

export abstract class Entity implements WithOptionalDbAttributes<BaseEntity> {
  private _id: string | undefined;
  private _createdAt: Date | undefined;
  private _updatedAt: Date | undefined;

  constructor({ id, createdAt, updatedAt }: Partial<DbAttributes> = {}) {
    if (id) this.id = id;
    if (createdAt) this._createdAt = createdAt;
    if (updatedAt) this._updatedAt = updatedAt;
  }

  public get id(): string | undefined {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public get createdAt(): Date | undefined {
    return this._createdAt;
  }

  public set createdAt(value: Date) {
    this._createdAt = value;
  }

  public get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  public set updatedAt(value: Date) {
    this._updatedAt = value;
  }
}
