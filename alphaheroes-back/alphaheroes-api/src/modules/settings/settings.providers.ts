import { Setting } from './setting.entity';
import { SETTING_REPOSITORY } from '../../core/constants';

export const settingsProviders = [
  {
    provide: SETTING_REPOSITORY,
    useValue: Setting,
  },
];
