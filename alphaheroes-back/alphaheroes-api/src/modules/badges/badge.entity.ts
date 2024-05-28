import {
  HasMany,
  BelongsToMany,
  BelongsTo,
  ForeignKey,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Progression } from '../progressions/progression.entity';
import { Profile } from '../profiles/profile.entity';
import { Chapter } from '../chapters/chapter.entity';

@Table
export class Badge extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Chapter)
  @Column({
    type: DataType.INTEGER,
  })
  chapterId: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.STRING,
  })
  image_url: string;

  @BelongsToMany(() => Profile, () => Progression)
  profiles: Profile[];

  @HasMany(() => Progression)
  progressions: Progression[];

  @BelongsTo(() => Chapter)
  chapter: Chapter;
}
