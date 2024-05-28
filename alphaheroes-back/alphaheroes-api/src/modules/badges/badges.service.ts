import { Injectable, Inject } from '@nestjs/common';
import { BADGE_REPOSITORY } from 'src/core/constants';
import { Badge } from './badge.entity';

@Injectable()
export class BadgesService {
  constructor(
    @Inject(BADGE_REPOSITORY)
    private readonly badgeRepository: typeof Badge,
  ) {}

  async getBadge(id: number): Promise<Badge> {
    return await this.badgeRepository.findByPk(id);
  }

  async getBadges(): Promise<Badge[]> {
    return await this.badgeRepository.findAll();
  }
}
