import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { profilesProviders } from './profiles.provider';
import { SettingsModule } from '../settings/settings.module';
import { ProgressionsModule } from '../progressions/progressions.module';
import { ChaptersModule } from '../chapters/chapters.module';
import { ExercisesProgressModule } from '../exercises-progress/exercises-progress.module';
import { ExercisesModule } from '../exercises/exercises.module';

@Module({
  imports: [
    SettingsModule,
    ProgressionsModule,
    ChaptersModule,
    ExercisesProgressModule,
    ExercisesModule,
  ],
  providers: [ProfilesService, ...profilesProviders],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
