import { IsNotEmpty, IsOptional } from 'class-validator';

export class BadgeDto {
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  readonly description: string;

  @IsOptional()
  readonly image_url: string;
}
