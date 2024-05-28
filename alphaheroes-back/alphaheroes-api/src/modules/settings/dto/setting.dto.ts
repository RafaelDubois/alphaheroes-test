import { IsNotEmpty } from 'class-validator';

export class SettingDto {
  @IsNotEmpty()
  readonly maxExercicesPerDay: number;

  @IsNotEmpty()
  readonly maxTimePerDay: number;
}
