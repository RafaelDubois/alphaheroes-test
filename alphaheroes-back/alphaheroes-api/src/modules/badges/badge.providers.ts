import { Badge } from './badge.entity';

import { BADGE_REPOSITORY } from 'src/core/constants';

export const badgesProviders = [
  {
    provide: BADGE_REPOSITORY,
    useValue: Badge, // Provide Badge model directly
  },
];
