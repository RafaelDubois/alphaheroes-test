import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Profile } from '../profiles/profile.entity';
import { Chapter } from '../chapters/chapter.entity';
import { Badge } from '../badges/badge.entity';

@Table
export class Progression extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Profile)
  @Column({
    type: DataType.INTEGER,
  })
  profileId: number;

  @ForeignKey(() => Chapter)
  @Column({
    type: DataType.INTEGER,
  })
  chapterId: number;

  @ForeignKey(() => Badge)
  @Column({
    type: DataType.INTEGER,
  })
  badgeId: number;

  @Column({
    type: DataType.BOOLEAN,
  })
  completedChapter: boolean;

  @BelongsTo(() => Profile)
  profile: Profile;

  @BelongsTo(() => Chapter)
  chapter: Chapter;

  @BelongsTo(() => Badge)
  badge: Badge;
}
