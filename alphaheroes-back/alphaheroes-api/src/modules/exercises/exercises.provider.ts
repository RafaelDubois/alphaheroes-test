import { Exercise } from './exercise.entity';

import { EXERCISE_REPOSITORY } from 'src/core/constants';

export const exercisesProviders = [
  {
    provide: EXERCISE_REPOSITORY,
    useValue: Exercise, // Provide Exercise model directly
  },
];
