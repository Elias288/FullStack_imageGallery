import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { File } from 'src/files/entities/file.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  userName: string;

  @Column()
  password: string;

  @OneToMany(() => File, (image) => image.user)
  images: File[];
}
