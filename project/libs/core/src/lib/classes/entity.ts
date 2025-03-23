import { BaseEntity } from '../interfaces/base/base-entity.interface';
import { WithOptionalId } from '../types/with-optional-id.type';

export abstract class Entity implements WithOptionalId<BaseEntity> {
  private _id: string | undefined;

  constructor(id?: string) {
    if (id) this.id = id;
  }

  public get id(): string | undefined {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }
}
