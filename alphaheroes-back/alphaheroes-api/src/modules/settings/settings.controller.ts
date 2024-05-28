import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingDto } from './dto/setting.dto';
import { Setting } from './setting.entity';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async findAll() {
    return await this.settingsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Setting> {
    return this.settingsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() setting: SettingDto) {
    return await this.settingsService.update(Number(id), setting);
  }
}
