import { Module } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { BadgesController } from './badges.controller';
import { badgesProviders } from './badge.providers';

@Module({
  providers: [BadgesService, ...badgesProviders],
  controllers: [BadgesController],
})
export class BadgesModule {}
