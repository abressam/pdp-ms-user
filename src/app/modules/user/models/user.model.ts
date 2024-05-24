import { DataType, Table, Column, Model } from 'sequelize-typescript';

@Table({
  tableName: 'User',
  timestamps: false,
})
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  is_admin: boolean;
}
