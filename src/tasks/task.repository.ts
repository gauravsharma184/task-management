import { EntityRepository, Repository, DataSource } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaksStatus } from './task-status.enum';
import { Injectable } from '@nestjs/common';

/*
    //able to maintain more readable code using Data Mapper
    In Data Mapper approach we define the logic of interacting with a database using respository

    In active record we define the database logic in the entity declaration itself 
    :used for simple application


    Repository is also just a class which extends the class repository from typeORM

    to make this repository available over the entire task module we will use dependency injection



*/
@Injectable()
export class TaskRepository extends Repository<Task> {
    constructor(private dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
      }
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
    //first we create an object based on the repository the task is not being saved in the database
        const task = this.create({
        title,
        description,
        status: TaksStatus.OPEN,
        });

        //now we will save the task into the database
        await this.save(task);
        return task;
        }
}
