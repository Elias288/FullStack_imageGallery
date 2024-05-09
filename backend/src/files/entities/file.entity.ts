import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Tag } from 'src/tag/entities/tag.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  fileId: number;

  @Column()
  path: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
