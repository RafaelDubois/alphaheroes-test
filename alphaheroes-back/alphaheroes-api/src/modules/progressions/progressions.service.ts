import { Injectable, Inject } from '@nestjs/common';
import { Progression } from './progression.entity';
import { PROGRESSION_REPOSITORY } from 'src/core/constants';

@Injectable()
export class ProgressionsService {
  constructor(
    @Inject(PROGRESSION_REPOSITORY)
    private readonly progressionRepository: typeof Progression,
  ) {}

  async createProgression(
    profileId: number,
    chapterId: number,
    completedChapter: boolean,
  ): Promise<Progression> {
    return await this.progressionRepository.create({
      profileId,
      chapterId,
      completedChapter,
    });
  }

  async getProgression(
    profileId: number,
    chapterId: number,
  ): Promise<Progression> {
    return await this.progressionRepository.findOne({
      where: { profileId, chapterId },
    });
  }

  async getProgressionByProfile(profileId: number): Promise<Progression> {
    return await this.progressionRepository.findOne({
      where: { profileId },
    });
  }

  async updateProgression(
    profileId: number,
    chapterId: number,
    data: Progression,
  ): Promise<Progression> {
    const progression = await this.progressionRepository.findOne({
      where: { profileId, chapterId },
    });
    if (progression) {
      await progression.update(data);
      return progression;
    }
    return null;
  }

  async deleteProgression(profileId: number, chapterId: number): Promise<void> {
    const progression = await this.progressionRepository.findOne({
      where: { profileId, chapterId },
    });
    if (progression) {
      await progression.destroy();
    }
  }

  async getProfileBadges(profileId: number): Promise<Progression[]> {
    return await this.progressionRepository.findAll({
      where: { profileId, completedChapter: true },
    });
  }

  async getProfileBadge(
    profileId: number,
    chapterId: number,
  ): Promise<Progression> {
    return await this.progressionRepository.findOne({
      where: { profileId, chapterId, completedChapter: true },
    });
  }
}
