import { Injectable, Inject } from '@nestjs/common';
import { Chapter } from './chapter.entity';
import { CHAPTER_REPOSITORY } from 'src/core/constants';

@Injectable()
export class ChaptersService {
  constructor(
    @Inject(CHAPTER_REPOSITORY)
    private readonly chapterRepository: typeof Chapter,
  ) {}

  async getChapter(id: number): Promise<Chapter> {
    return await this.chapterRepository.findByPk(id);
  }

  async getChapters(): Promise<Chapter[]> {
    return await this.chapterRepository.findAll();
  }

  async updateChapter(id: number): Promise<Chapter> {
    const chapter = await this.chapterRepository.findByPk(id);
    return await chapter.update({ completed: true });
  }

  async resetCompletedChapters(): Promise<Chapter[]> {
    const chapters = await this.chapterRepository.findAll();
    for (const chapter of chapters) {
      await chapter.update({ completed: false });
    }
    return chapters;
  }
}
