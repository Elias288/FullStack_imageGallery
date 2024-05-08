import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

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
}
