import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Post } from './index';

@Table
export class Author extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  bio: string;

  @HasMany(() => Post)
  posts: Post[];
}
