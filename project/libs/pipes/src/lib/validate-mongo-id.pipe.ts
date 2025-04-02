import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ValidateMongoIdPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (metadata.type !== 'param' && metadata.type !== 'query') {
      throw new Error(
        'ValidateMongoIdPipe can only be used on route parameters or query parameters'
      );
    }

    if (!isValidObjectId(value)) {
      throw new BadRequestException('Bad entity ID format');
    }

    return value;
  }
}
