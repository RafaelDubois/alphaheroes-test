import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { Chapter } from '../chapters/chapter.entity';
import { ExerciseProgress } from '../exercises-progress/exercises-progress.entity';
import { Profile } from '../profiles/profile.entity';

@Table
export class Exercise extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  exercise_type: string;

  @Column({
    type: DataType.INTEGER,
  })
  difficulty: number;

  @Column({
    type: DataType.STRING,
  })
  instructions: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  completed: boolean;

  @ForeignKey(() => Chapter)
  @Column({
    type: DataType.INTEGER,
  })
  chapterId: number;

  @BelongsTo(() => Chapter)
  chapter: Chapter;

  @BelongsToMany(() => Profile, () => ExerciseProgress)
  profiles: Profile[];

  @HasMany(() => ExerciseProgress)
  exerciseProgress: ExerciseProgress[];
}
