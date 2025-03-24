import { validateOrReject, ValidationError } from 'class-validator';
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

  public async validate(): Promise<void> {
    try {
      await validateOrReject(this);
    } catch (error: unknown) {
      console.error(
        `${
          this.schemaName
        } validation failed!\n\n${formatSchemaValidationErrors(
          error as ValidationError[]
        )}`
      );
      throw error;
    }
  }
}

export { ConfigSchema };
