import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';

/*
    //able to maintain more readable code using Data Mapper
    In Data Mapper approach we define the logic of interacting with a database using respository

    In active record we define the database logic in the entity declaration itself 
    :used for simple application


    Repository is also just a class which extends the class repository from typeORM

    to make this repository available over the entire task module we will use dependency injection



*/
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {}
