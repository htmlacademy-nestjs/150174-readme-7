import { Expose } from 'class-transformer';
import { IsMongoId } from 'class-validator';

export class FeedSubscribeDto {
  @IsMongoId({
    message: 'Invalid user ID',
  })
  @Expose()
  userId: string;
}
