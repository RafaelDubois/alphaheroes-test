import { IsNotEmpty, IsOptional } from 'class-validator';

export class ChapterDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly completed: string;

  @IsOptional()
  readonly date: Date;

  @IsOptional()
  readonly order: number;
}
