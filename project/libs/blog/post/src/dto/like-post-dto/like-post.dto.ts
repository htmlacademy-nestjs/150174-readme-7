import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { IsMongoId } from 'class-validator';
import { LikePostValidationMessage } from '../dto-validations.const';

export class LikePostDto {
  @ApiProperty({
    description: 'User ID',
    example: '60f5b2b3c4e9d2b9c8b2c8b2c',
  })
  @IsMongoId({ message: LikePostValidationMessage.userId })
  @Expose()
  public userId: string;
}
