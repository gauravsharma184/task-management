import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaksStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Entity()
export class Task {
  // used to define the primary key of the table: auto generated
  @PrimaryGeneratedColumn('uuid')
  id: string;
  // @Column is used to define coulmns in our table
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaksStatus;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
