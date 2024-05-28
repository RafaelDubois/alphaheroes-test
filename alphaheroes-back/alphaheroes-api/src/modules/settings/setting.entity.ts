import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { User } from '../users/user.entity';
import { Profile } from '../profiles/profile.entity';

@Table
export class Setting extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  parentId: number;

  @ForeignKey(() => Profile)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  profileId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  maxExercicesPerDay: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  maxTimePerDay: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Profile)
  profile: Profile;
}
