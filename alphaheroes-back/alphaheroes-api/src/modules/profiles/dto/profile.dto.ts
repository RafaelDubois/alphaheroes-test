import { IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class ProfileDto {
  @IsNotEmpty()
  @MinLength(3)
  readonly name: string;

  @IsNotEmpty()
  readonly avatar: string;

  @IsNotEmpty()
  readonly totalChaptersCompleted: number = 0;

  @IsOptional()
  // @IsHexColor()
  readonly themeColor: string;
}
