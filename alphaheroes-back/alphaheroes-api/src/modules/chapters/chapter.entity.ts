import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsToMany,
  HasOne,
} from 'sequelize-typescript';
import { Profile } from '../profiles/profile.entity';
import { Exercise } from '../exercises/exercise.entity';
import { Progression } from '../progressions/progression.entity';
import { Badge } from '../badges/badge.entity';

@Table
export class Chapter extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  completed: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  date: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  order: number;

  @BelongsToMany(() => Profile, () => Progression)
  profiles: Profile[];

  @HasMany(() => Progression)
  progressions: Progression[];

  @HasMany(() => Exercise)
  exercises: Exercise[];

  @HasOne(() => Badge)
  badge: Badge;
}
