import { Injectable, Inject, Logger } from '@nestjs/common';
// import { Transaction } from 'sequelize';

import { Profile } from './profile.entity';
import { ProfileDto } from './dto/profile.dto';
import { PROFILE_REPOSITORY } from 'src/core/constants';
import { SettingsService } from '../settings/settings.service';
import { SettingDto } from '../settings/dto/setting.dto';
import { Setting } from '../settings/setting.entity';
// import { ProgressionsService } from '../progressions/progressions.service';
import { Progression } from '../progressions/progression.entity';
import { ProgressionsService } from '../progressions/progressions.service';
import { ChaptersService } from '../chapters/chapters.service';
import { ExercisesService } from '../exercises/exercises.service';
import { ExerciseProgress } from '../exercises-progress/exercises-progress.entity';
import { ExercisesProgressService } from '../exercises-progress/exercises-progress.service';

@Injectable()
export class ProfilesService {
  private readonly logger = new Logger(ProfilesService.name);
  constructor(
    @Inject(PROFILE_REPOSITORY)
    private readonly profileRepository: typeof Profile,
    private readonly settingsService: SettingsService,
    private readonly progressionsService: ProgressionsService,
    private readonly chaptersService: ChaptersService,
    private readonly exercisesService: ExercisesService,
    private readonly exercisesProgressService: ExercisesProgressService,
    // private readonly progressionsService: ProgressionsService,
    // private readonly sequelize: Sequelize,
  ) {}
  async create(profile: ProfileDto, parentId: number): Promise<Profile> {
    const newProfile = await this.profileRepository.create<Profile>({
      ...profile,
      parentId: parentId,
    });

    // Create the default setting for the profile
    const settingDto: SettingDto = {
      maxExercicesPerDay: 10, // Default value
      maxTimePerDay: 60, // Default value
    };

    const settingData = {
      ...settingDto,
      parentId: newProfile.parentId, // Add userId here
      profileId: newProfile.id, // Add profileId here
    };

    try {
      await this.settingsService.create(settingData);
    } catch (error) {
      this.logger.error(`Error creating setting: ${error.message}`);
    }

    // Get all exercises
    const exercises = await this.exercisesService.getExercises();
    // Create a progression for each exercise
    for (const exercise of exercises) {
      try {
        const exerciseProgress = new ExerciseProgress();
        exerciseProgress.profileId = newProfile.id;
        exerciseProgress.exerciseId = exercise.id;
        exerciseProgress.completedExercise = false;

        this.logger.log(
          `Creating exercise progress: ${JSON.stringify(exerciseProgress)}`,
        );

        await this.exercisesProgressService.createExerciseProgress(
          exerciseProgress.profileId,
          exerciseProgress.exerciseId,
          exerciseProgress.completedExercise,
        );
      } catch (error) {
        this.logger.error(`Error creating exercise progress: ${error.message}`);
      }
    }

    // Get all chapters
    const chapters = await this.chaptersService.getChapters();

    // Create a progression for each chapter
    for (const chapter of chapters) {
      const progression = new Progression();
      progression.profileId = newProfile.id;
      progression.chapterId = chapter.id;
      progression.completedChapter = false;

      this.logger.log(`Creating progression: ${JSON.stringify(progression)}`);

      try {
        await this.progressionsService.createProgression(
          progression.profileId,
          progression.chapterId,
          progression.completedChapter,
        );
      } catch (error) {
        this.logger.error(`Error creating progression: ${error.message}`);
      }
    }

    return newProfile;
  }

  async findAll(): Promise<Profile[]> {
    return await this.profileRepository.findAll<Profile>({
      include: [Setting, Progression, ExerciseProgress],
    });
  }

  async findAllByParentId(parentId: number): Promise<Profile[]> {
    return await this.profileRepository.findAll<Profile>({
      where: { parentId },
      include: [Setting, Progression, ExerciseProgress],
    });
  }

  async findOne(id: number): Promise<Profile> {
    return await this.profileRepository.findOne<Profile>({
      where: { id },
      include: [Setting, Progression, ExerciseProgress],
    });
  }

  //   async findOneByUserId(userId: number): Promise<Profile> {
  //     return await this.profileRepository.findOne<Profile>({
  //       where: { userId },
  //     });
  //   }

  async delete(id: number, parentId: number) {
    return await this.profileRepository.destroy({
      where: { id, parentId },
    });
  }

  async update(id: number, data: ProfileDto, parentId: number) {
    try {
      const [numberOfAffectedRows, [updatedProfile]] =
        await this.profileRepository.update(
          { ...data },
          { where: { id, parentId }, returning: true },
        );
      return { numberOfAffectedRows, updatedProfile };
    } catch (error) {
      // Handle the error here
      throw new Error('Failed to update profile');
    }
  }

  async getOverallProgress(profileId: number): Promise<Progression> {
    const overallProgress =
      await this.progressionsService.getProgressionByProfile(profileId);
    return overallProgress;
  }

  async getProfileBadges(profileId: number): Promise<Progression[]> {
    const profileBadges =
      await this.progressionsService.getProfileBadges(profileId);
    return profileBadges;
  }

  async getProfileBadge(
    profileId: number,
    chapterId: number,
  ): Promise<Progression> {
    const profileBadge = await this.progressionsService.getProfileBadge(
      profileId,
      chapterId,
    );
    return profileBadge;
  }
}
