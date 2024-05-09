import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  tagId: number;

  @Column()
  name: string;

  @Column()
  type: string;
}
