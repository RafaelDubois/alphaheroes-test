import { EXERCISE_PROGRESS_REPOSITORY } from 'src/core/constants';
import { ExerciseProgress } from './exercises-progress.entity';

export const progressProviders = [
  {
    provide: EXERCISE_PROGRESS_REPOSITORY,
    useValue: ExerciseProgress,
  },
];
