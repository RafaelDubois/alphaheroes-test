import { Sequelize } from 'sequelize-typescript';

import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/user.entity';
import { Profile } from 'src/modules/profiles/profile.entity';
import { Setting } from 'src/modules/settings/setting.entity';
import { Chapter } from 'src/modules/chapters/chapter.entity';
import { Progression } from 'src/modules/progressions/progression.entity';
import { Exercise } from 'src/modules/exercises/exercise.entity';
import { ExerciseProgress } from 'src/modules/exercises-progress/exercises-progress.entity';
import { Badge } from 'src/modules/badges/badge.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([
        User,
        Profile,
        Setting,
        Chapter,
        Progression,
        Exercise,
        ExerciseProgress,
        Badge,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
