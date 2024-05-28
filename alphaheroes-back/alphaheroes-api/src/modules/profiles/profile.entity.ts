import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';

import { User } from '../users/user.entity';
import { Setting } from '../settings/setting.entity';
import { Progression } from '../progressions/progression.entity';
import { Chapter } from '../chapters/chapter.entity';
import { ExerciseProgress } from '../exercises-progress/exercises-progress.entity';
import { Exercise } from '../exercises/exercise.entity';

@Table
export class Profile extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  parentId: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  avatar: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  totalChaptersCompleted: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  themeColor: string;

  @BelongsTo(() => User)
  user: User;

  @HasOne(() => Setting)
  setting: Setting;

  @BelongsToMany(() => Chapter, () => Progression)
  chapters: Chapter[];

  @HasMany(() => Progression)
  progressions: Progression[];

  @BelongsToMany(() => Exercise, () => ExerciseProgress)
  exercises: Exercise[];

  @HasMany(() => ExerciseProgress)
  exerciseProgress: ExerciseProgress[];
}
