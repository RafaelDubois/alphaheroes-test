import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';

import { Profile } from '../profiles/profile.entity';
import { Setting } from '../settings/setting.entity';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastname: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @HasMany(() => Profile)
  profiles: Profile[];

  @HasMany(() => Setting)
  settings: Setting[];
}
