import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaksStatus } from './task-status.enum';

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
}
