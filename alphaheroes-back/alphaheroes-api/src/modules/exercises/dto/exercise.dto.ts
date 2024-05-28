import { IsNotEmpty } from 'class-validator';

export class ExerciseDto {
  @IsNotEmpty()
  exercise_type: string;

  @IsNotEmpty()
  difficulty: number;

  @IsNotEmpty()
  instructions: string;

  @IsNotEmpty()
  completed: boolean;
}
