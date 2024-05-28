import { Inject, Injectable } from '@nestjs/common';
import { Exercise } from './exercise.entity';
import { EXERCISE_REPOSITORY } from 'src/core/constants';

@Injectable()
export class ExercisesService {
  constructor(
    @Inject(EXERCISE_REPOSITORY)
    private readonly exerciseRepository: typeof Exercise,
  ) {}

  async getExercise(id: number): Promise<Exercise> {
    return await this.exerciseRepository.findByPk(id);
  }

  async getExercises(): Promise<Exercise[]> {
    return await this.exerciseRepository.findAll();
  }

  async updateExercise(id: number): Promise<Exercise> {
    const exercise = await this.exerciseRepository.findByPk(id);
    return await exercise.update({ completed: true });
  }

  async resetCompletedExercises(): Promise<Exercise[]> {
    const exercises = await this.exerciseRepository.findAll();
    for (const exercise of exercises) {
      await exercise.update({ completed: false });
    }
    return exercises;
  }
}
