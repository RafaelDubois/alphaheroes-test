import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
import { SettingsModule } from './modules/settings/settings.module';
import { ProgressionsModule } from './modules/progressions/progressions.module';
import { ChaptersModule } from './modules/chapters/chapters.module';
import { ExercisesModule } from './modules/exercises/exercises.module';
import { ExercisesProgressModule } from './modules/exercises-progress/exercises-progress.module';
import { BadgesModule } from './modules/badges/badges.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    ProfilesModule,
    SettingsModule,
    ProgressionsModule,
    ChaptersModule,
    ExercisesModule,
    ExercisesProgressModule,
    BadgesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
