import { Task } from 'src/tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
  //eager set to true loads the main enity witht the relation: which owns the relationship (the table which has the foreign key is called the main enitity)
  @OneToMany(() => Task, (task) => task.user, {eager: true})
  tasks: Task[];
}
