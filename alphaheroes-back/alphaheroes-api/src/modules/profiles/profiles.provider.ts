import { Profile } from './profile.entity';

import { PROFILE_REPOSITORY } from 'src/core/constants';

export const profilesProviders = [
  {
    provide: PROFILE_REPOSITORY,
    useValue: Profile, // Provide Profile model directly
  },
];
