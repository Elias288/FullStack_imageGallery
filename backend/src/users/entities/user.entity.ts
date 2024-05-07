import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userName: string;

  @Column()
  password: string;

  constructor(user: CreateUserDto) {
    Object.assign(this, user);
  }
}
