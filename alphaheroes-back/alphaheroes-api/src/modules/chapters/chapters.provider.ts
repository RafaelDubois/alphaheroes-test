import { Chapter } from './chapter.entity';

import { CHAPTER_REPOSITORY } from 'src/core/constants';

export const chaptersProviders = [
  {
    provide: CHAPTER_REPOSITORY,
    useValue: Chapter, // Provide Chapter model directly
  },
];
