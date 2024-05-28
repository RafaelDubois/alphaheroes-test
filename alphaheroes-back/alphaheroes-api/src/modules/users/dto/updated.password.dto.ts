import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdatedPasswordDto {
  @IsNotEmpty()
  @MinLength(6)
  readonly currentPassword: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly newPassword: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly confirmNewPassword: string;
}
