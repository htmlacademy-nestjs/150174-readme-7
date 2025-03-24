import { ValidationError } from 'class-validator';

const formatSchemaValidationErrors = (errors: ValidationError[]): string => {
  return errors.map((error) => error.toString()).join('\n');
};

export { formatSchemaValidationErrors };
