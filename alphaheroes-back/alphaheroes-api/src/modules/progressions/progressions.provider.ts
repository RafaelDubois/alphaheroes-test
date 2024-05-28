import { PROGRESSION_REPOSITORY } from 'src/core/constants';
import { Progression } from './progression.entity';

export const progressionsProviders = [
  {
    provide: PROGRESSION_REPOSITORY,
    useValue: Progression,
  },
];
