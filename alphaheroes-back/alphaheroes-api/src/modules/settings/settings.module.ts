import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { settingsProviders } from './settings.providers';

@Module({
  providers: [SettingsService, ...settingsProviders],
  controllers: [SettingsController],
  exports: [SettingsService],
})
export class SettingsModule {}
