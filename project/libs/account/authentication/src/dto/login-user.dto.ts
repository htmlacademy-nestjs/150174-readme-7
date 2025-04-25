import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsStrongPassword, Length } from 'class-validator';
import { UserValidation } from './dto-validations.const';

export class LoginUserDto {
  @ApiProperty({
    description: 'User email',
    type: 'string',
    example: 'wasd@mail.com',
  })
  @IsEmail({}, { message: UserValidation.email.validType.message })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User password',
    type: 'string',
    example: 'ed323cw!4cds!D',
  })
  @IsStrongPassword({}, { message: UserValidation.password.validType.message })
  @Length(
    UserValidation.password.length.min,
    UserValidation.password.length.max,
    { message: UserValidation.password.length.message }
  )
  @Expose()
  public password: string;
}
