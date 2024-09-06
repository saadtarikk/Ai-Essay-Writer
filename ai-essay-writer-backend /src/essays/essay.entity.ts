import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Essay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  topic: string;

  @Column()
  paperType: string;

  @Column()
  subjectArea: string;

  @ManyToOne(() => User, user => user.essays)
  user: User;
}