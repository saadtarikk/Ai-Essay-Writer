import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Essay } from '../essays/essay.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => Essay, essay => essay.user)
  essays: Essay[];
}