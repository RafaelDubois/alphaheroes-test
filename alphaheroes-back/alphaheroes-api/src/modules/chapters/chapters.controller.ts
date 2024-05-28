import { Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  //   @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return await this.chaptersService.getChapters();
  }
  //   @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.chaptersService.getChapter(id);
  }

  @Put(':id')
  async update(@Param('id') id: number) {
    return this.chaptersService.updateChapter(id);
  }

  @Put('reset')
  async reset() {
    return this.chaptersService.resetCompletedChapters();
  }
}
