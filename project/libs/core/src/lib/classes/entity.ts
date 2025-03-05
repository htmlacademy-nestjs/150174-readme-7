import { BaseEntity } from '../interfaces/base/base-entity.interface';

export abstract class Entity implements BaseEntity {
  private _id: string = '';

  public get id() {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }
}
