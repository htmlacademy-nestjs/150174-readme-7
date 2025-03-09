import { BaseEntity } from '../interfaces/base/base-entity.interface';

export abstract class Entity implements BaseEntity {
  private _id!: string;

  constructor(id: string = '') {
    this.id = id;
  }

  public get id() {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }
}
