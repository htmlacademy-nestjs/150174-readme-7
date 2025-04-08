import { validateSync } from 'class-validator';
import { formatSchemaValidationErrors } from '../helpers/schema.helpers';

class ConfigSchema {
  private _schemaName: string;

  constructor(schemaName: string) {
    this._schemaName = schemaName;
  }

  public get schemaName(): string {
    return this._schemaName;
  }

  public set schemaName(value: string) {
    this._schemaName = value;
  }

  public validate(): void {
    const errors = validateSync(this);
    if (errors.length > 0) {
      const message = `${
        this.schemaName
      } validation failed!\n\n${formatSchemaValidationErrors(errors)}`;
      throw new Error(message);
    }
  }
}

export { ConfigSchema };
