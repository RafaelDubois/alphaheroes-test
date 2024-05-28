import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ProgressionsService } from './progressions.service';
import { Progression } from './progression.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('progression')
export class ProgressionsController {
  constructor(private readonly progressionService: ProgressionsService) {}

  //   @Post(':profileId/:chapterId')
  //   async createProgression(@Param('profileId') profileId: number, @Param('chapterId') chapterId: number) {
  //     return await this.progressionService.createProgression(profileId, chapterId);
  //   }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile/:profileId/chapter/:chapterId')
  async getProgression(
    @Param('profileId') profileId: number,
    @Param('chapterId') chapterId: number,
  ) {
    return await this.progressionService.getProgression(profileId, chapterId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile/:profileId')
  async getProgressionByProfile(@Param('profileId') profileId: number) {
    return await this.progressionService.getProgressionByProfile(profileId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('profile/:profileId/chapter/:chapterId')
  async updateProgression(
    @Param('profileId') profileId: number,
    @Param('chapterId') chapterId: number,
    @Body() data: Progression,
  ) {
    return await this.progressionService.updateProgression(
      profileId,
      chapterId,
      data,
    );
  }

  //   @Delete(':profileId/chapter/:chapterId')
  //   async deleteProgression(@Param('profileId') profileId: number, @Param('chapterId') chapterId: number) {
  //     return await this.progressionService.deleteProgression(profileId, chapterId);
  //   }
}
