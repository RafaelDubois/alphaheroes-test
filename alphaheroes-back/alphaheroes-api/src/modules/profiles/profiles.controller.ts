import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ProfilesService } from './profiles.service';
import { Profile as ProfileEntity } from './profile.entity';
import { ProfileDto } from './dto/profile.dto';
import { Progression } from '../progressions/progression.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  // @UseGuards(AuthGuard('jwt'))
  // @Get()
  // async findAll(): Promise<ProfileEntity[]> {
  //   return await this.profilesService.findAll();
  // }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAllByParentId(@Request() req): Promise<ProfileEntity[]> {
    return await this.profilesService.findAllByParentId(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProfileEntity> {
    const profile = await this.profilesService.findOne(Number(id));
    if (!profile) {
      throw new NotFoundException("Ce profil n'existe pas");
    }
    return profile;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() profile: ProfileDto,
    @Request() req,
  ): Promise<ProfileEntity> {
    // create a new profile and return the newly created profile
    return await this.profilesService.create(profile, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() profile: ProfileDto,
    @Request() req,
  ): Promise<ProfileEntity> {
    const { numberOfAffectedRows, updatedProfile } =
      await this.profilesService.update(Number(id), profile, req.user.id);
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("Ce profil n'existe pas");
    }
    return updatedProfile;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req): Promise<string> {
    const deleted = await this.profilesService.delete(Number(id), req.user.id);
    if (deleted === 0) {
      throw new NotFoundException("Ce profil n'existe pas");
    }
    return 'Suppression réussie';
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/badges')
  async getProfileBadges(@Param('id') id: string): Promise<Progression[]> {
    return await this.profilesService.getProfileBadges(Number(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/badge/:chapterId')
  async getProfileBadge(
    @Param('id') id: string,
    @Param('chapterId') chapterId: string,
  ): Promise<Progression> {
    return await this.profilesService.getProfileBadge(
      Number(id),
      Number(chapterId),
    );
  }
}
