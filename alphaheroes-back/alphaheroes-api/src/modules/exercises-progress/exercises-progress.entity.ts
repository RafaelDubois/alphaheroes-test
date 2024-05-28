import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Profile } from '../profiles/profile.entity';
import { Exercise } from '../exercises/exercise.entity';

@Table
export class ExerciseProgress extends Model {
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

  @ForeignKey(() => Exercise)
  @Column({
    type: DataType.INTEGER,
  })
  exerciseId: number;

  @Column({
    type: DataType.BOOLEAN,
  })
  completedExercise: boolean;

  @BelongsTo(() => Profile)
  profile: Profile;

  @BelongsTo(() => Exercise)
  exercise: Exercise;
}
