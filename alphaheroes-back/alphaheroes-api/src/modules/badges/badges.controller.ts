import { Controller, Get, Param } from '@nestjs/common';
import { BadgesService } from './badges.service';

@Controller('badges')
export class BadgesController {
  constructor(private readonly badgesService: BadgesService) {}

  @Get()
  async findAll() {
    return await this.badgesService.getBadges();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.badgesService.getBadge(id);
  }
}
