import { Inject, Injectable } from '@nestjs/common';
import { EXERCISE_PROGRESS_REPOSITORY } from 'src/core/constants';
import { ExerciseProgress } from './exercises-progress.entity';

@Injectable()
export class ExercisesProgressService {
  constructor(
    @Inject(EXERCISE_PROGRESS_REPOSITORY)
    private readonly exerciseProgressRepository: typeof ExerciseProgress,
  ) {}

  async createExerciseProgress(
    profileId: number,
    exerciseId: number,
    completedExercise: boolean,
  ): Promise<ExerciseProgress> {
    return await this.exerciseProgressRepository.create({
      profileId,
      exerciseId,
      completedExercise,
    });
  }

  async getExerciseProgress(
    profileId: number,
    exerciseId: number,
  ): Promise<ExerciseProgress> {
    return await this.exerciseProgressRepository.findOne({
      where: { profileId, exerciseId },
    });
  }

  async getExerciseProgressByProfile(
    profileId: number,
  ): Promise<ExerciseProgress> {
    return await this.exerciseProgressRepository.findOne({
      where: { profileId },
    });
  }

  async updateExerciseProgress(
    profileId: number,
    chapterId: number,
    data: ExerciseProgress,
  ): Promise<ExerciseProgress> {
    const exerciseProgress = await this.exerciseProgressRepository.findOne({
      where: { profileId, chapterId },
    });
    if (exerciseProgress) {
      await exerciseProgress.update(data);
      return exerciseProgress;
    }
    return null;
  }

  async deleteExerciseProgress(
    profileId: number,
    exerciseId: number,
  ): Promise<void> {
    const exerciseProgress = await this.exerciseProgressRepository.findOne({
      where: { profileId, exerciseId },
    });
    if (exerciseProgress) {
      await exerciseProgress.destroy();
    }
  }
}
