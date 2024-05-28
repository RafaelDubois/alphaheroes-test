import { Injectable, Inject } from '@nestjs/common';
import { Setting } from './setting.entity';
import { SettingDto } from './dto/setting.dto';

import { SETTING_REPOSITORY } from '../../core/constants';
// import { Optional } from 'sequelize';

@Injectable()
export class SettingsService {
  constructor(
    @Inject(SETTING_REPOSITORY)
    private readonly settingRepository: typeof Setting,
  ) {}

  async create(setting: Omit<SettingDto, 'id'>): Promise<Setting> {
    return await this.settingRepository.create<Setting>(setting);
  }

  async findAll(): Promise<Setting[]> {
    return await this.settingRepository.findAll<Setting>();
  }

  async findOne(id: number): Promise<Setting> {
    return await this.settingRepository.findOne<Setting>({
      where: { id: id },
    });
  }

  async update(id: number, setting: SettingDto): Promise<string> {
    try {
      const updatedSetting = await this.settingRepository.update(setting, {
        where: { id },
      });
      if (updatedSetting[0] === 0) {
        throw new Error('Setting not found');
      }
      return 'Les paramètres ont été mis à jour avec succès';
    } catch (error) {
      throw new Error('Failed to update setting');
    }
  }

  async delete(id: number): Promise<string> {
    try {
      const deletedSettingStatus = await this.settingRepository.destroy({
        where: { id },
      });
      if (deletedSettingStatus === 0) {
        throw new Error('Setting not found');
      }
      return 'Setting has been deleted';
    } catch (error) {
      throw new Error('Failed to delete setting');
    }
  }
}
