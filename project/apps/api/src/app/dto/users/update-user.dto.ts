import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString, Length } from 'class-validator';
import { WritableUser } from '@avylando-readme/core';
import { ApiUserValidation } from './dto-validation.const';

export class UpdateUserApiDto implements Partial<WritableUser> {
  @ApiProperty({
    description: 'User first name',
    type: 'string',
    example: 'John',
  })
  @IsString({ message: ApiUserValidation.firstName.validType.message })
  @Length(
    ApiUserValidation.firstName.length.min,
    ApiUserValidation.firstName.length.max,
    { message: ApiUserValidation.firstName.length.message }
  )
  @IsOptional()
  @Expose()
  public firstName?: WritableUser['firstName'];

  @ApiProperty({
    description: 'User last name',
    type: 'string',
    example: 'Doe',
  })
  @IsString({ message: ApiUserValidation.lastName.validType.message })
  @Length(
    ApiUserValidation.lastName.length.min,
    ApiUserValidation.lastName.length.max,
    { message: ApiUserValidation.lastName.length.message }
  )
  @IsOptional()
  @Expose()
  public lastName?: WritableUser['lastName'];

  @ApiProperty({
    description: 'User avatar',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  @Expose()
  public avatar?: Express.Multer.File;
}
