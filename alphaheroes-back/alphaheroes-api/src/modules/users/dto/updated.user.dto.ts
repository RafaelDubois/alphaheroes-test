import { IsNotEmpty, IsEmail } from 'class-validator';

export class UpdatedUserDto {
  @IsNotEmpty()
  readonly firstname?: string;

  @IsNotEmpty()
  readonly lastname?: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email?: string;
}
