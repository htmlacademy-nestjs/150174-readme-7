export abstract class Entity {
  private _id: string = '';

  public get id() {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }
}
